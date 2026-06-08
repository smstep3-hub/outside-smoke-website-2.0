-- Seed an admin by email. Replace the email with an actual admin email, or run using service_role.
insert into admin_users (user_id, email)
select u.id, u.email
from auth.users u
where u.email = 'admin@example.com'
on conflict do nothing;
