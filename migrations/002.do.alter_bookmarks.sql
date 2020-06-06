CREATE TYPE article_category AS ENUM (
    'Listicle',
    'How-to',
    'News',
    'Interview',
    'Story'
);
ALTER TABLE bookmarks
  ADD COLUMN
    style article_category;
