-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Create tours table
create table public.tours (
    id uuid default uuid_generate_v4() primary key,
    title_ru varchar(255) not null,
    title_kz varchar(255) not null,
    description_ru text not null,
    description_kz text not null,
    image_url varchar(500) not null,
    start_date timestamp with time zone not null,
    end_date timestamp with time zone not null,
    duration_days integer not null,
    price_kzt integer not null,
    is_featured boolean default false,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table public.tours enable row level security;

-- Create policy to allow all operations (since this is a public website)
create policy "Allow all operations on tours" on public.tours
    for all using (true);

-- Create function to update updated_at timestamp
create or replace function public.handle_updated_at()
returns trigger as $$
begin
    new.updated_at = timezone('utc'::text, now());
    return new;
end;
$$ language plpgsql security definer;

-- Create trigger to automatically update updated_at
create trigger handle_tours_updated_at
    before update on public.tours
    for each row execute procedure public.handle_updated_at();

-- Insert sample data
insert into public.tours (title_ru, title_kz, description_ru, description_kz, image_url, start_date, end_date, duration_days, price_kzt, is_featured) values
('Поход на Кок-Жайляу', 'Көк-Жайлауға серуен', 'Живописный однодневный поход к знаменитой поляне Кок-Жайляу. Насладитесь потрясающими видами Алматы с высоты 1500 метров.', 'Көк-Жайлау дегеп аталатын әйгілі алаңға бір күндік серуен. 1500 метр биіктіктен Алматының керемет көріністерін тамашалаңыз.', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', '2025-08-15T06:00:00Z', '2025-08-15T18:00:00Z', 1, 15000, true),
('Восхождение на пик Фурмановка', 'Фурмановка шыңына өрлеу', 'Двухдневное восхождение на один из популярных пиков Заилийского Алатау. Высота 3053 метра.', 'Іле Алатауының танымал шыңдарының біріне екі күндік өрлеу. Биіктігі 3053 метр.', 'https://images.unsplash.com/photo-1464822759844-d150baec0e17?w=800&h=600&fit=crop', '2025-08-20T05:00:00Z', '2025-08-21T19:00:00Z', 2, 35000, false),
('Треккинг в Большом Алматинском ущелье', 'Үлкен Алматы шатқалында серуендеу', 'Трехдневный треккинг через живописные места БАО с посещением горных озер и водопадов.', 'ҮАЖ-дың көркем жерлері арқылы тау көлдері мен сарқырамаларға барумен үш күндік серуен.', 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop', '2025-09-01T07:00:00Z', '2025-09-03T17:00:00Z', 3, 55000, false),
('Поход к Большому Алматинскому озеру', 'Үлкен Алматы көліне серуен', 'Однодневный поход к знаменитому горному озеру на высоте 2511 метров. Кристально чистая вода и горные пейзажи.', '2511 метр биіктіктегі әйгілі тау көліне бір күндік серуен. Мөлдір таза су және тау пейзаждары.', 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800&h=600&fit=crop', '2025-08-25T06:30:00Z', '2025-08-25T19:30:00Z', 1, 18000, false);