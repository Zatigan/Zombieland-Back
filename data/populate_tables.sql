BEGIN;

-- Insertion de catégories
INSERT INTO "category" 
("name")
VALUES
    ('Montagnes russes'),
    ('Aventure aquatique'),
    ('Labyrinthe hanté'),
    ('Réalité virtuelle'),
    ('Parcours interactif');

-- Insertion des attractions avec chemins d'accès aux images
INSERT INTO "attraction" 
("name", "image", "description_short", "description_long", "opening_time", "closing_time", "disable_access", "weather_hazard", "height_restriction", "health_hazard") 
VALUES

    ('Zombie Escape Coaster', '/img/Zombie_Escape Coaster.webp', 'Une montagne russe terrifiante où vous devez échapper à une horde de zombies affamés !', 'Zombie Escape Coaster vous propulse dans une course effrénée pour échapper aux morts-vivants. Avec des montées vertigineuses et des chutes à couper le souffle, cette attraction garantit une montée d''adrénaline à chaque virage. À bord de votre wagon, traversez des décors post-apocalyptiques et affrontez des obstacles animatroniques réalistes.', '10:00:00', '22:00:00', 'Non accessible aux personnes à mobilité réduite', 'Fermée en cas de forte pluie ou de tempête.', 1.20, 'Déconseillé aux femmes enceintes, aux personnes ayant des problèmes cardiaques ou des troubles de la colonne vertébrale.'),   
    ('The Infected Swamp', '/img/the-infected-swamp-4.webp', 'Traversez un marécage infecté, peuplé de zombies aquatiques prêts à surgir à tout moment !', 'The Infected Swamp est un parcours aquatique lugubre où les visiteurs naviguent dans un radeau au milieu de zombies infestant les eaux troubles. L''atmosphère oppressante, les effets de brume et les créatures surgissant de l''eau font de cette attraction un véritable cauchemar vivant.', '11:00:00', '21:00:00', 'Accessible aux personnes à mobilité réduite', 'Ouvert par tout temps', 1.10, 'Déconseillé aux personnes ayant des troubles respiratoires ou cardiaques.'),    
    ('Deadly Labyrinth', '/img/deadly-labyrinth-4.webp', 'Tentez de sortir d''un labyrinthe hanté où les zombies vous guettent à chaque détour !', 'Deadly Labyrinth est une aventure à pied où vous devez échapper à des zombies en déambulant dans un labyrinthe truffé de pièges. Chaque recoin sombre cache un danger potentiel, et vous devez faire preuve de sang-froid pour éviter de vous faire attraper.', '12:00:00', '22:00:00', 'Accessible aux personnes à mobilité réduite (parcours adapté)', 'Ouvert par tout temps', 1.10, 'Déconseillé aux personnes souffrant de claustrophobie ou ayant des problèmes cardiaques.'),    
    ('Virus Outbreak VR', '/img/virus-outbreak-vr-4.webp', 'Plongez dans une réalité virtuelle où vous devez survivre à une épidémie de zombies.', 'Virus Outbreak VR offre une expérience immersive à 360 degrés. Munis de casques VR, les participants sont plongés dans un monde où les zombies envahissent chaque coin de rue. Vous devez résoudre des énigmes et éviter les zombies pour vous échapper.', '10:00:00', '20:00:00', 'Accessible aux personnes à mobilité réduite', 'Ouvert par tout temps (intérieur)', 1.30, 'Non recommandé aux personnes sujettes au mal des transports ou souffrant de vertiges.'),   
    ('The Quarantine Zone', '/img/the-quarantine-zone-1.webp', 'Entrez dans une zone de quarantaine infestée de zombies et trouvez la sortie avant qu''il ne soit trop tard !', 'The Quarantine Zone est une attraction interactive où les visiteurs, par groupe, doivent traverser un parcours jonché de zombies tout en évitant de se faire capturer. Le parcours mêle énigmes et frissons dans une ambiance de confinement militaire.', '11:00:00', '21:00:00', 'Non accessible aux personnes à mobilité réduite.', 'Ouvert par tout temps', 1.20, 'Déconseillé aux personnes ayant des problèmes cardiaques ou respiratoires.');

-- Insertion de la table de liaison entre les catégories et les attractions
INSERT INTO "attraction_category" 
("attraction_id", "category_id")
VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5);

-- Insertion des utilisateurs

INSERT INTO "user" 
("firstname", "lastname", "email", "password")
VALUES
    ('Alice', 'Martin', 'alice.martin@example.com', 'password123'),
    ('Bob', 'Dupont', 'bob.dupont@example.com', 'password456'),
    ('Claire', 'Durand', 'claire.durand@example.com', 'password789'),
    ('David', 'Moreau', 'david.moreau@example.com', 'password101');



INSERT INTO "reservation"
("user_id", "ref_number", "date", "ticket", "total_price")
VALUES
(1, 10001, '2024-11-15', 2, 120.00),
(2, 10002, '2024-11-16', 4, 240.00),
(3, 10003, '2024-11-17', 1, 60.00),
(4, 10004, '2024-11-17', 3, 180.00);


COMMIT;


