INSERT OR IGNORE INTO genres(name, slug) VALUES
('Fiction','fiction'),('Philosophy','philosophy'),('Fantasy','fantasy'),('Adventure','adventure'),('Science Fiction','science-fiction'),('History','history');

INSERT OR IGNORE INTO authors(slug,name,bio) VALUES
('paulo-coelho','Paulo Coelho','Brazilian novelist known for philosophical and spiritual fiction.'),
('george-orwell','George Orwell','English novelist and essayist whose work explored politics, language and society.'),
('j-r-r-tolkien','J. R. R. Tolkien','English writer and philologist best known for Middle-earth.'),
('mary-shelley','Mary Shelley','English novelist whose work helped shape modern science fiction.');

INSERT OR IGNORE INTO books(slug,title,description,editorial_description,why_this_book,isbn,language,pages,publication_date,publisher,cover_url,rating,rating_count,public_domain,source)
VALUES
('the-alchemist','The Alchemist','A philosophical novel about following a dream and listening to what matters.','A compact, accessible story for readers who like reflective fiction.','Its simple journey structure makes big questions about purpose and choice easy to approach.','9780062315007','en',208,'1988','HarperOne','https://covers.openlibrary.org/b/isbn/9780062315007-L.jpg',4.4,1000,0,'curated'),
('1984','1984','A dystopian novel about surveillance, language, power and individual freedom.','A foundational dystopian novel that remains useful for thinking about information and authority.','Its ideas give readers a strong starting point for discussing propaganda, privacy and political language.','9780451524935','en',328,'1949','Signet Classics','https://covers.openlibrary.org/b/isbn/9780451524935-L.jpg',4.5,1200,0,'curated'),
('the-lord-of-the-rings','The Lord of the Rings','An epic fantasy journey across Middle-earth.','A landmark fantasy epic with deep world-building and memorable character arcs.','Choose it if you want a long, immersive adventure built around friendship, courage and responsibility.','9780544003415','en',1178,'1954','Mariner Books','https://covers.openlibrary.org/b/isbn/9780544003415-L.jpg',4.7,1800,0,'curated'),
('frankenstein','Frankenstein','A Gothic novel about ambition, responsibility and the consequences of creation.','An early science-fiction classic with a surprisingly modern ethical core.','Its questions about invention and responsibility still make it an excellent discussion book.','9780486282114','en',280,'1818','Dover Publications','https://covers.openlibrary.org/b/isbn/9780486282114-L.jpg',4.3,900,1,'curated');

INSERT OR IGNORE INTO book_authors(book_id,author_id) SELECT b.id,a.id FROM books b,authors a WHERE b.slug='the-alchemist' AND a.slug='paulo-coelho';
INSERT OR IGNORE INTO book_authors(book_id,author_id) SELECT b.id,a.id FROM books b,authors a WHERE b.slug='1984' AND a.slug='george-orwell';
INSERT OR IGNORE INTO book_authors(book_id,author_id) SELECT b.id,a.id FROM books b,authors a WHERE b.slug='the-lord-of-the-rings' AND a.slug='j-r-r-tolkien';
INSERT OR IGNORE INTO book_authors(book_id,author_id) SELECT b.id,a.id FROM books b,authors a WHERE b.slug='frankenstein' AND a.slug='mary-shelley';

INSERT OR IGNORE INTO book_genres(book_id,genre_id) SELECT b.id,g.id FROM books b,genres g WHERE b.slug='the-alchemist' AND g.slug IN ('fiction','philosophy','adventure');
INSERT OR IGNORE INTO book_genres(book_id,genre_id) SELECT b.id,g.id FROM books b,genres g WHERE b.slug='1984' AND g.slug IN ('fiction','history');
INSERT OR IGNORE INTO book_genres(book_id,genre_id) SELECT b.id,g.id FROM books b,genres g WHERE b.slug='the-lord-of-the-rings' AND g.slug IN ('fantasy','adventure');
INSERT OR IGNORE INTO book_genres(book_id,genre_id) SELECT b.id,g.id FROM books b,genres g WHERE b.slug='frankenstein' AND g.slug IN ('fiction','science-fiction');

INSERT OR IGNORE INTO curated_lists(title,slug,intro_text,published_at) VALUES
('Best Short Philosophy Books','short-philosophy-books','A starter collection for readers who want philosophical ideas without a huge time commitment.',CURRENT_TIMESTAMP),
('Classic Books Everyone Should Know','classic-books','A human-curated starting point for exploring influential classics.',CURRENT_TIMESTAMP);

INSERT OR IGNORE INTO curated_list_items(list_id,book_id,position,commentary) SELECT l.id,b.id,1,'A concise philosophical journey that is easy to enter.' FROM curated_lists l,books b WHERE l.slug='short-philosophy-books' AND b.slug='the-alchemist';
INSERT OR IGNORE INTO curated_list_items(list_id,book_id,position,commentary) SELECT l.id,b.id,1,'A foundational dystopian novel about power and language.' FROM curated_lists l,books b WHERE l.slug='classic-books' AND b.slug='1984';
INSERT OR IGNORE INTO curated_list_items(list_id,book_id,position,commentary) SELECT l.id,b.id,2,'An early science-fiction classic with enduring ethical questions.' FROM curated_lists l,books b WHERE l.slug='classic-books' AND b.slug='frankenstein';
