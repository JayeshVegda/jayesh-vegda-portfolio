# Supabase Integration Setup

This project uses Supabase as the backend database for all portfolio data. All static config files have been replaced with dynamic Supabase queries.

## Prerequisites

1. Create a Supabase account at [supabase.com](https://supabase.com)
2. Create a new project in Supabase
3. Get your project credentials

## Environment Variables

Add the following environment variables to your `.env.local` file:

```env
# Supabase Configuration (Required)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Optional: For admin operations (server-side only)
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### Getting Your Supabase Credentials

1. Go to your Supabase project dashboard
2. Navigate to **Settings** → **API**
3. Copy the following:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon/public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role key** (optional, for admin operations) → `SUPABASE_SERVICE_ROLE_KEY`

**Important**: 
- The `NEXT_PUBLIC_` prefix makes variables accessible in the browser
- The service role key should NEVER have the `NEXT_PUBLIC_` prefix as it bypasses Row Level Security
- Keep your service role key secret and only use it in server-side code

## Database Setup

### 1. Run the Schema

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Copy and paste the contents of `db/schema.sql`
4. Click **Run** to execute the schema

This will create all necessary tables:
- `projects` - Portfolio projects
- `experience` - Work experience entries
- `skills` - Technical skills
- `contributions` - Open source contributions
- `site_config` - Site configuration (single row)
- `socials` - Social media links
- `stats` - Coding statistics
- `achievements` - Achievements and milestones

### 2. Row Level Security (RLS)

The schema includes RLS policies that allow:
- **Public read access**: Anyone can read all data (for portfolio display)
- **Admin write access**: Configure based on your authentication setup

For production, you should:
1. Set up Supabase Auth
2. Create a user roles system
3. Update RLS policies to restrict writes to admin users only

For now, the admin panel uses password-based authentication (configured in `lib/admin-utils.ts`).

## Data Migration

### Migrating Existing Data

To migrate your existing static config data to Supabase:

1. **Run the migration script** (see `scripts/migrate-to-supabase.ts`)
2. Or manually import data through the Supabase dashboard
3. Or use the admin panel to add data one by one

The migration script reads from your existing config files and inserts them into Supabase.

## Project Structure

```
lib/supabase/
├── client.ts          # Client-side Supabase client
├── server.ts          # Server-side Supabase clients
├── queries.ts         # Read queries (public data)
├── admin.ts           # Admin CRUD operations
└── transformers.ts    # Data transformation utilities

db/
└── schema.sql         # Database schema
```

## Usage

### Reading Data (Public)

All pages automatically fetch data from Supabase:

```typescript
import { getProjects, getExperiences, getSkills } from '@/lib/supabase/queries';

// In a Server Component
const projects = await getProjects();
const experiences = await getExperiences();
const skills = await getSkills();
```

### Admin Operations

Admin operations use the admin functions:

```typescript
import { createProject, updateProject, deleteProject } from '@/lib/supabase/admin';

// Create
await createProject(projectData);

// Update
await updateProject(id, updatedData);

// Delete
await deleteProject(id);
```

## API Routes

All admin API routes (`/api/admin/*`) have been updated to use Supabase:

- `GET /api/admin/projects` - List all projects
- `POST /api/admin/projects` - Create project
- `PUT /api/admin/projects` - Update project
- `DELETE /api/admin/projects` - Delete project

Same pattern for: `experience`, `skills`, `contributions`, `site`, `socials`

## Features

✅ **Dynamic Data**: All data is now stored in Supabase  
✅ **Real-time Updates**: Changes reflect immediately  
✅ **Admin Panel**: Full CRUD operations via admin panel  
✅ **Type Safety**: Full TypeScript support  
✅ **Error Handling**: Graceful error handling with fallbacks  
✅ **Loading States**: Proper loading states in components  

## Troubleshooting

### "Missing Supabase environment variables"

Make sure you've added `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` to your `.env.local` file.

### "Error fetching data"

1. Check that your Supabase project is active
2. Verify your API keys are correct
3. Check that the schema has been applied (run `db/schema.sql`)
4. Verify RLS policies allow public read access

### Admin operations failing

1. Make sure you're authenticated (admin password set in `lib/admin-utils.ts`)
2. For write operations, ensure RLS policies allow writes (or temporarily disable RLS for development)
3. Check that `SUPABASE_SERVICE_ROLE_KEY` is set if using service role client

## Next Steps

1. **Set up Authentication**: Implement Supabase Auth for secure admin access
2. **Add User Roles**: Create a roles system for fine-grained access control
3. **Update RLS Policies**: Restrict write access to authenticated admin users
4. **Add Validation**: Add Zod schemas for data validation
5. **Add Caching**: Implement React Query or SWR for client-side caching

## Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [Next.js with Supabase](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)

