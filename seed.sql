
-- categories table
INSERT INTO flotex_schm.categories (id, name, image_url, description)
VALUES 
  ('denim','denim', 'https://res.cloudinary.com/dyxuhm6xg/image/upload/v1744944057/flotex/categories/u97w3hncum4wcxxjppiu.webp', 'Colección de telas denim en diferentes pesos y acabados.'),
  ('moda-mujer','moda mujer', 'https://res.cloudinary.com/dyxuhm6xg/image/upload/v1744944057/flotex/categories/g0dtcw4xylkf3osjbsvt.webp', 'Telas modernas y versátiles para ropa femenina.'),
  ('sportech','sportech', 'https://res.cloudinary.com/dyxuhm6xg/image/upload/v1744944057/flotex/categories/ibgdjrcgcgxp1niftju9.webp', 'Telas técnicas para ropa deportiva y de alto rendimiento.'),
  ('crudo','crudo', 'https://res.cloudinary.com/dyxuhm6xg/image/upload/v1744944056/flotex/categories/cfppop6hqokbifl7pjab.webp', 'Telas en estado natural, sin teñir ni procesos químicos.');



-- products table divided by categories
INSERT INTO flotex_schm.products (name, image_url, description, price, sku, stock, category_id)
VALUES
  ('Denim Stretch Azul Claro', 'https://fakeimg.pl/800x800/', 'Mezclilla elástica ideal para jeans ajustados', 14.50, 'DEN-STR-BLCL', 99, 'denim'),
  ('Denim Rígido Azul Oscuro', 'https://fakeimg.pl/800x800/', 'Mezclilla sin spandex, resistente y duradera', 10, 'DEN-RIG-BLOS', 99, 'denim'),
  ('Denim Lavado Vintage', 'https://fakeimg.pl/800x800/', 'Denim con acabado desgastado, look retro', 13, 'DEN-LAV-VTG', 99, 'denim'),
  ('Denim Negro Opaco', 'https://fakeimg.pl/800x800/', 'Mezclilla negra con opacidad y estructura firme', 10, 'DEN-NEGO', 99, 'denim'),
  ('Denim Celeste para Camisas', 'https://fakeimg.pl/800x800/', 'Ligero y suave, ideal para prendas superiores', 10, 'DEN-CAM-CELE', 99, 'denim'),

  ('Popelina Estampada Floral', 'https://fakeimg.pl/800x800/', 'Tela ligera con motivos florales', 10, 'MOD-FLR-PPL', 99, 'moda-mujer'),
  ('Gasa Chiffon Liso', 'https://fakeimg.pl/800x800/', 'Tela translúcida para vestidos y blusas', 15, 'MOD-CHIF-LIS', 99, 'moda-mujer'),
  ('Lino con Spandex', 'https://fakeimg.pl/800x800/', 'Tela fresca con caída y elasticidad ligera', 21, 'MOD-LIN-SPX', 99, 'moda-mujer'),
  ('Satén Brillante', 'https://fakeimg.pl/800x800/', 'Tela suave y brillante, ideal para ropa elegante', 34, 'MOD-SAT-BRI', 99, 'moda-mujer'),
  ('Jersey Modal', 'https://fakeimg.pl/800x800/', 'Tela de punto suave para tops y vestidos', 22, 'MOD-JER-MOD', 99, 'moda-mujer'),

  ('Lycra Deportiva', 'https://fakeimg.pl/800x800/', 'Tejido elástico para leggings y ropa deportiva', 13.50, 'SPO-LYC-DEP', 99, 'sportech'),
  ('Microfibra Respirable', 'https://fakeimg.pl/800x800/', 'Tela ligera, ideal para camisetas deportivas', 13, 'SPO-MIC-RES', 99, 'sportech'),
  ('Poliéster DryFit', 'https://fakeimg.pl/800x800/', 'Tela que absorbe humedad, perfecta para entrenamiento', 5, 'SPO-DRY-POL', 99, 'sportech'),
  ('Malla Técnica', 'https://fakeimg.pl/800x800/', 'Tela con estructura de red, ventilada', 55, 'SPO-MALL-TEC', 8, 'sportech'),
  ('Softshell con Fleece', 'https://fakeimg.pl/800x800/', 'Tela impermeable con interior cálido', 34, 'SPO-SFT-FLE', 99, 'sportech'),

  ('Algodón Crudo 100%', 'https://fakeimg.pl/800x800/', 'Tela impermeable con interior cálido', 13, 'CRU-ALG-100', 99, 'crudo'),
  ('Lona Cruda Pesada', 'https://fakeimg.pl/800x800/', 'Tela impermeable con interior cálido', 21, 'CRU-LON-PES', 99, 'crudo'),
  ('Franela Cruda Suave', 'https://fakeimg.pl/800x800/', 'Tela impermeable con interior cálido', 13, 'CRU-FRA-SUA', 99, 'crudo'),
  ('Lino Crudo Natural', 'https://fakeimg.pl/800x800/', 'Tela impermeable con interior cálido', 8, 'CRU-LIN-NAT', 99, 'crudo'),
  ('Mezcla Algodón/Poliéster Crudo', 'https://fakeimg.pl/800x800/', 'Tela impermeable con interior cálido', 5, 'CRU-MIX-ALGPO', 99, 'crudo');