BEGIN;

-- Insertion de catégories
INSERT INTO "category" 
("id", "name")
VALUES
    (1, 'Montagnes russes'),
    (2, 'Aventure aquatique'),
    (3, 'Labyrinthe hanté'),
    (4, 'Réalité virtuelle'),
    (5, 'Parcours interactif');

-- Insertion des attractions avec chemins d'accès aux images
INSERT INTO "attraction" 
("id", "category_id", "name", "image", "description_short", "description_long", "opening_time", "closing_time", "disable_access", "weather_hazard", "height_restriction", "health_hazard") 
VALUES
    (1, 1, 'Zombie Escape Coaster', '/img/Zombie_Escape Coaster.webp', 'Une montagne russe terrifiante où vous devez échapper à une horde de zombies affamés !', 'Zombie Escape Coaster vous propulse dans une course effrénée pour échapper aux morts-vivants...', '10:00:00', '22:00:00', 'Non accessible aux personnes à mobilité réduite', 'Fermée en cas de forte pluie ou de tempête.', 1.20, 'Déconseillé aux femmes enceintes, aux personnes ayant des problèmes cardiaques ou des troubles de la colonne vertébrale.'),
    (2, 2, 'The Infected Swamp', '/img/the-infected-swamp-4.webp', 'Traversez un marécage infecté, peuplé de zombies aquatiques prêts à surgir à tout moment !', 'The Infected Swamp est un parcours aquatique lugubre où les visiteurs naviguent...', '11:00:00', '21:00:00', 'Accessible aux personnes à mobilité réduite', 'Ouvert par tout temps', 1.10, 'Déconseillé aux personnes ayant des troubles respiratoires ou cardiaques.'),
    (3, 3, 'Deadly Labyrinth', '/img/deadly-labyrinth-4.webp', 'Tentez de sortir d''un labyrinthe hanté où les zombies vous guettent à chaque détour !', 'Deadly Labyrinth est une aventure à pied où vous devez échapper à des zombies...', '12:00:00', '22:00:00', 'Accessible aux personnes à mobilité réduite (parcours adapté)', 'Ouvert par tout temps', 1.10, 'Déconseillé aux personnes souffrant de claustrophobie ou ayant des problèmes cardiaques.'),
    (4, 4, 'Virus Outbreak VR', '/img/virus-outbreak-vr-4.webp', 'Plongez dans une réalité virtuelle où vous devez survivre à une épidémie de zombies.', 'Virus Outbreak VR offre une expérience immersive à 360 degrés...', '10:00:00', '20:00:00', 'Accessible aux personnes à mobilité réduite', 'Ouvert par tout temps (intérieur)', 1.30, 'Non recommandé aux personnes sujettes au mal des transports ou souffrant de vertiges.'),
    (5, 5, 'The Quarantine Zone', '/img/the-quarantine-zone-1.webp', 'Entrez dans une zone de quarantaine infestée de zombies et trouvez la sortie avant qu''il ne soit trop tard !', 'The Quarantine Zone est une attraction interactive où les visiteurs doivent traverser un parcours...', '11:00:00', '21:00:00', 'Non accessible aux personnes à mobilité réduite', 'Ouvert par tout temps', 1.20, 'Déconseillé aux personnes ayant des problèmes cardiaques ou respiratoires.');

COMMIT;
