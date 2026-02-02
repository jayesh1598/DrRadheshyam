/**
 * Uploads a file to GitHub repository and returns the raw content URL
 */
export async function uploadToGitHub(
  blob: Blob,
  filename: string,
  path: string = 'gallery'
): Promise<string> {
  const token = import.meta.env.VITE_GITHUB_TOKEN;
  const owner = 'jayesh1598';
  const repo = 'DrRadheshyam';
  const branch = 'main';

  if (!token) {
    throw new Error('GitHub token not configured');
  }

  // Convert blob to base64
  const arrayBuffer = await blob.arrayBuffer();
  const uint8Array = new Uint8Array(arrayBuffer);
  let binaryString = '';
  for (let i = 0; i < uint8Array.length; i++) {
    binaryString += String.fromCharCode(uint8Array[i]);
  }
  const base64Data = btoa(binaryString);

  // Create file path
  const filePath = `${path}/${filename}`;

  try {
    // Check if file exists and get its SHA
    let sha: string | undefined;
    try {
      const checkResponse = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}?ref=${branch}`,
        {
          headers: {
            Authorization: `token ${token}`,
            Accept: 'application/vnd.github.v3+json',
          },
        }
      );

      if (checkResponse.ok) {
        const checkData = (await checkResponse.json()) as { sha?: string };
        sha = checkData.sha;
      }
    } catch (e) {
      // File doesn't exist, that's fine
    }

    // Upload or update file
    const uploadResponse = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `token ${token}`,
          'Content-Type': 'application/json',
          Accept: 'application/vnd.github.v3+json',
        },
        body: JSON.stringify({
          message: `Upload image: ${filename}`,
          content: base64Data,
          branch: branch,
          ...(sha && { sha }),
        }),
      }
    );

    if (!uploadResponse.ok) {
      const errorData = await uploadResponse.json();
      throw new Error(
        `GitHub upload failed: ${errorData.message || uploadResponse.statusText}`
      );
    }

    // Return raw content URL
    const rawUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${filePath}`;
    return rawUrl;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to upload image to GitHub: ${error.message}`);
    }
    throw error;
  }
}

/**
 * Generates a unique filename with timestamp
 */
export function generateUniqueFilename(originalFilename: string): string {
  const timestamp = Date.now();
  const randomStr = Math.random().toString(36).substring(2, 8);
  const ext = originalFilename.split('.').pop() || 'jpg';
  return `img_${timestamp}_${randomStr}.${ext}`;
}
