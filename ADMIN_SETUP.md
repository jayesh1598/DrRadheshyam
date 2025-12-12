# Admin Panel Setup Guide

## Overview
This admin panel allows you to manage all website content including News, Gallery, Certificates, Banner Slides, and About sections.

## Access Admin Panel
- **Login URL**: `/admin/login`
- **Default Credentials**: Use your Supabase email and password

## Supabase Tables Setup

Before using the admin panel, you need to create the following tables in Supabase:

### 1. News Articles Table
```sql
CREATE TABLE news_articles (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  date date NOT NULL,
  category text NOT NULL,
  excerpt text,
  image text,
  source text,
  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now()
);
```

### 2. Gallery Images Table
```sql
CREATE TABLE gallery_images (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  image_url text NOT NULL,
  alt_text text NOT NULL,
  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now()
);
```

### 3. Certificates Table
```sql
CREATE TABLE certificates (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  date date NOT NULL,
  institution text NOT NULL,
  description text,
  image_url text,
  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now()
);
```

### 4. Banner Slides Table
```sql
CREATE TABLE banner_slides (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  image_url text NOT NULL,
  alt_text text NOT NULL,
  display_order integer DEFAULT 0,
  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now()
);
```

### 5. About Content Table
```sql
CREATE TABLE about_content (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  section text NOT NULL UNIQUE,
  content text,
  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now()
);
```

## Steps to Create Tables

1. Go to your Supabase Dashboard
2. Navigate to the SQL Editor
3. Copy and paste each SQL query above
4. Execute each query to create the tables

## Admin Features

### News Management
- Add/Edit/Delete news articles
- Manage article metadata (title, date, category, source)
- Add article images and excerpts

### Gallery Management
- Add/Remove gallery images
- Manage image alt text for accessibility

### Certificates Management
- Add/Edit/Delete certificates
- Manage institution and dates
- Add certificate images

### Banner Slides Management
- Add/Remove banner slides
- Control slide order
- Manage slide images

### About Content Management
- Edit different about sections:
  - Overview
  - Mission
  - Achievements
  - Biography

## Authentication

The admin panel uses Supabase Authentication. Make sure:
1. You have Supabase set up with your project
2. Your `publicAnonKey` is configured in `src/utils/supabase/info.tsx`
3. You have created at least one user account in Supabase Auth

## Usage

1. Navigate to `/admin/login`
2. Enter your Supabase credentials
3. You'll be redirected to the admin dashboard
4. Select the section you want to manage
5. Use the CRUD forms to add/edit/delete content
6. Changes are saved directly to Supabase

## Row Level Security (RLS)

For production, consider enabling Row Level Security on your tables:
- Allow authenticated users to read/write their own data
- Restrict anonymous access

## Tips

- Always use proper image URLs (they should be accessible)
- Keep article titles concise but descriptive
- Use meaningful alt text for images
- Maintain consistent date formats
- Test changes in the frontend after updating
