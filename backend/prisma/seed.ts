import 'dotenv/config';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client';

const connectionString = `${process.env.DATABASE_URL}`;
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.$executeRaw`
    INSERT INTO "Category"
      ("pk_category", "vc_description")
    VALUES
      (0, 'Desativado'),
      (1, 'Países'),
      (2, 'Continentes')
    ON CONFLICT DO NOTHING;

    INSERT INTO "Role"
      ("pk_role", "vc_description")
    VALUES
      (0, 'Desativado'),
      (1, 'Membro'),
      (2, 'Mantenedor')
    ON CONFLICT DO NOTHING;

    INSERT INTO "Answer"
      ("vc_option", "fk_category")
    VALUES
      -- https://github.com/stefangabos/world_countries
      ('Afeganistão', 1),
      ('África do Sul', 1),
      ('Albânia', 1),
      ('Alemanha', 1),
      ('Andorra', 1),
      ('Angola', 1),
      ('Antígua e Barbuda', 1),
      ('Arábia Saudita', 1),
      ('Argélia', 1),
      ('Argentina', 1),
      ('Armênia', 1),
      ('Austrália', 1),
      ('Áustria', 1),
      ('Azerbaijão', 1),
      ('Bahamas', 1),
      ('Bangladexe', 1),
      ('Barbados', 1),
      ('Barém', 1),
      ('Bélgica', 1),
      ('Belize', 1),
      ('Benim', 1),
      ('Bielorrússia', 1),
      ('Bolívia', 1),
      ('Bósnia e Herzegovina', 1),
      ('Botsuana', 1),
      ('Brasil', 1),
      ('Brunei', 1),
      ('Bulgária', 1),
      ('Burquina Fasso', 1),
      ('Burundi', 1),
      ('Butão', 1),
      ('Cabo Verde', 1),
      ('Camboja', 1),
      ('Camarões', 1),
      ('Canadá', 1),
      ('Catar', 1),
      ('Cazaquistão', 1),
      ('República Centro-Africana', 1),
      ('Chade', 1),
      ('Chéquia', 1),
      ('Chile', 1),
      ('China', 1),
      ('Chipre', 1),
      ('Colômbia', 1),
      ('Comores', 1),
      ('República do Congo', 1),
      ('República Democrática do Congo', 1),
      ('Coreia do Sul', 1),
      ('Coreia do Norte', 1),
      ('Costa do Marfim', 1),
      ('Costa Rica', 1),
      ('Croácia', 1),
      ('Cuba', 1),
      ('Dinamarca', 1),
      ('Djibuti', 1),
      ('Dominica', 1),
      ('República Dominicana', 1),
      ('Egito', 1),
      ('El Salvador', 1),
      ('Emirados Árabes Unidos', 1),
      ('Equador', 1),
      ('Eritreia', 1),
      ('Eslováquia', 1),
      ('Eslovênia', 1),
      ('Espanha', 1),
      ('Estados Unidos', 1),
      ('Estónia', 1),
      ('Essuatíni', 1),
      ('Etiópia', 1),
      ('Fiji', 1),
      ('Filipinas', 1),
      ('Finlândia', 1),
      ('França', 1),
      ('Gabão', 1),
      ('Gâmbia', 1),
      ('Gana', 1),
      ('Geórgia', 1),
      ('Granada', 1),
      ('Grécia', 1),
      ('Guatemala', 1),
      ('Guiana', 1),
      ('Guiné-Bissau', 1),
      ('Guiné', 1),
      ('Guiné Equatorial', 1),
      ('Haiti', 1),
      ('Honduras', 1),
      ('Hungria', 1),
      ('Iêmen', 1),
      ('Índia', 1),
      ('Indonésia', 1),
      ('Iraque', 1),
      ('Irã', 1),
      ('Irlanda', 1),
      ('Islândia', 1),
      ('Israel', 1),
      ('Itália', 1),
      ('Jamaica', 1),
      ('Japão', 1),
      ('Jordânia', 1),
      ('Kuwait', 1),
      ('Laos', 1),
      ('Lesoto', 1),
      ('Letónia', 1),
      ('Líbano', 1),
      ('Libéria', 1),
      ('Líbia', 1),
      ('Listenstaine', 1),
      ('Lituânia', 1),
      ('Luxemburgo', 1),
      ('Macedônia do Norte', 1),
      ('Madagáscar', 1),
      ('Malásia', 1),
      ('Maláui', 1),
      ('Maldivas', 1),
      ('Mali', 1),
      ('Malta', 1),
      ('Marrocos', 1),
      ('Ilhas Marshall', 1),
      ('Ilhas Maurícias', 1),
      ('Mauritânia', 1),
      ('México', 1),
      ('Mianmar', 1),
      ('Estados Federados da Micronésia', 1),
      ('Moçambique', 1),
      ('Moldávia', 1),
      ('Mónaco', 1),
      ('Mongólia', 1),
      ('Montenegro', 1),
      ('Namíbia', 1),
      ('Nauru', 1),
      ('Nepal', 1),
      ('Nicarágua', 1),
      ('Níger', 1),
      ('Nigéria', 1),
      ('Noruega', 1),
      ('Nova Zelândia', 1),
      ('Omã', 1),
      ('Países Baixos', 1),
      ('Palau', 1),
      ('Panamá', 1),
      ('Papua-Nova Guiné', 1),
      ('Paquistão', 1),
      ('Paraguai', 1),
      ('Peru', 1),
      ('Polónia', 1),
      ('Portugal', 1),
      ('Quênia', 1),
      ('Quirguistão', 1),
      ('Quiribáti', 1),
      ('Reino Unido', 1),
      ('Roménia', 1),
      ('Ruanda', 1),
      ('Rússia', 1),
      ('Samoa', 1),
      ('Ilhas Salomão', 1),
      ('San Marino', 1),
      ('Santa Lúcia', 1),
      ('São Cristóvão e Neves', 1),
      ('São Tomé e Príncipe', 1),
      ('São Vicente e Granadinas', 1),
      ('Seicheles', 1),
      ('Senegal', 1),
      ('Seri Lanca', 1),
      ('Serra Leoa', 1),
      ('Sérvia', 1),
      ('Singapura', 1),
      ('Síria', 1),
      ('Somália', 1),
      ('Sudão', 1),
      ('Sudão do Sul', 1),
      ('Suécia', 1),
      ('Suíça', 1),
      ('Suriname', 1),
      ('Tailândia', 1),
      ('Tajiquistão', 1),
      ('Tanzânia', 1),
      ('Timor-Leste', 1),
      ('Togo', 1),
      ('Tonga', 1),
      ('Trinidad e Tobago', 1),
      ('Tunísia', 1),
      ('Turcomenistão', 1),
      ('Turquia', 1),
      ('Tuvalu', 1),
      ('Ucrânia', 1),
      ('Uganda', 1),
      ('Uruguai', 1),
      ('Uzbequistão', 1),
      ('Vanuatu', 1),
      ('Venezuela', 1),
      ('Vietname', 1),
      ('Zâmbia', 1),
      ('Zimbábue', 1),
      -- https://pt.wikipedia.org/wiki/Continente#Modelos_continentais
      ('América', 2),
      ('Europa', 2),
      ('Ásia', 2),
      ('África', 2),
      ('Oceania', 2),
      ('Antártida', 2)
    ON CONFLICT DO NOTHING;

    INSERT INTO "Quiz"
      ("vc_title", "vc_text")
    VALUES
      ('Quiz sobre dimensões', 'Esse quiz testa conhecimentos sobre as dimensões dos países'),
      ('Quiz sobre fronteiras', 'Esse quiz testa conhecimentos sobre as fronteiras dos países'),
      ('Quiz sobre continentes', 'Esse quiz testa conhecimentos sobre os continentes e países')
    ON CONFLICT DO NOTHING;

    INSERT INTO "Question"
      ("vc_text", "fk_category", "nu_right_answer")
    VALUES
      ('Qual é o maior país do mundo?', 1, 153),
      ('Qual é o sexto maior país do mundo?', 1, 12),
      ('Qual é o maior país da África?', 1, 9),
      ('Qual é o menor país da Ásia?', 1, 114),
      ('Portugal faz fronteira com que país?', 1, 65),
      ('Entre esses países, qual não faz fronteira com o Brasil?', 1, 61),
      ('Gâmbia faz fronteira com que país?', 1, 162),
      ('Entre esses países, qual não faz fronteira com o México?', 1, 86),
      ('Em qual continente fica Suriname?', 2, 194),
      ('Em qual continente fica Luxemburgo?', 2, 195),
      ('Em qual continente fica Nepal?', 2, 196),
      ('Em qual continente fica Gabão?', 2, 197),
      ('Em qual continente fica Vanuatu?', 2, 198)
    ON CONFLICT DO NOTHING;

    INSERT INTO "_QuestionToQuiz"
      ("A", "B")
    VALUES
      (1, 1),
      (2, 1),
      (3, 1),
      (4, 1),
      (5, 2),
      (6, 2),
      (7, 2),
      (8, 2),
      (9, 3),
      (10, 3),
      (11, 3),
      (12, 3),
      (13, 3)
    ON CONFLICT DO NOTHING;

    INSERT INTO "_AnswerToQuestion"
      ("A", "B")
    VALUES
      (153, 1),
      (35, 1),
      (42, 1),
      (66, 1),
      (12, 2),
      (26, 2),
      (89, 2),
      (10, 2),
      (9, 3),
      (169, 3),
      (106, 3),
      (39, 3),
      (114, 4),
      (18, 4),
      (166, 4),
      (27, 4),
      (65, 5),
      (73, 5),
      (96, 5),
      (4, 5),
      (61, 6),
      (44, 6),
      (190, 6),
      (81, 6),
      (61, 7),
      (120, 7),
      (115, 7),
      (82, 7),
      (86, 8),
      (66, 8),
      (80, 8),
      (20, 8),
      (194, 9),
      (195, 9),
      (196, 9),
      (197, 9),
      (195, 10),
      (196, 10),
      (197, 10),
      (194, 10),
      (196, 11),
      (197, 11),
      (194, 11),
      (195, 11),
      (197, 12),
      (194, 12),
      (195, 12),
      (196, 12),
      (198, 13),
      (194, 13),
      (195, 13),
      (196, 13)
    ON CONFLICT DO NOTHING;
  `;
}

main()
  .then(async () => {
    await prisma.$disconnect();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    await pool.end();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    await pool.end();
    process.exit(1);
  });
