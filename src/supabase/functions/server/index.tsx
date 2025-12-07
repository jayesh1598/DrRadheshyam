import { Hono } from 'npm:hono';
import { cors } from 'npm:hono/cors';
import { logger } from 'npm:hono/logger';

const app = new Hono();

app.use('*', cors());
app.use('*', logger(console.log));

// Facebook posts endpoint
app.get('/make-server-dcb37a05/facebook-posts', async (c) => {
  try {
    const accessToken = Deno.env.get('FACEBOOK_ACCESS_TOKEN');
    
    if (!accessToken) {
      console.log('Error fetching Facebook posts: No access token configured');
      return c.json({ 
        error: 'Facebook access token not configured. Please set up your Facebook API access token.' 
      }, 500);
    }

    // Facebook Page ID extracted from the URL
    const pageId = 'dr.radheshyamguptaji';
    
    // Fetch posts from Facebook Graph API
    const response = await fetch(
      `https://graph.facebook.com/v18.0/${pageId}/posts?fields=id,message,created_time,full_picture,permalink_url,attachments{media,type,subattachments}&access_token=${accessToken}&limit=50`
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.log(`Error fetching Facebook posts: ${JSON.stringify(errorData)}`);
      return c.json({ 
        error: 'Failed to fetch Facebook posts',
        details: errorData 
      }, response.status);
    }

    const data = await response.json();
    
    return c.json({
      success: true,
      posts: data.data || []
    });

  } catch (error) {
    console.log(`Error in Facebook posts endpoint: ${error}`);
    return c.json({ 
      error: 'Failed to fetch Facebook posts',
      message: error.message 
    }, 500);
  }
});

Deno.serve(app.fetch);
