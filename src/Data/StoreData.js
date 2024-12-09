import Product_1 from "../Assets/Products/plant.png";
import Product_2 from "../Assets/Products/plant2.png";
import Product_3 from "../Assets/Products/plant3.png";
import Product_4 from "../Assets/Products/plant4.png";
import Product_5 from "../Assets/Products/product1.png";
import Product_6 from "../Assets/Products/product2.png";
import Product_7 from "../Assets/Products/product3.png";
import Product_8 from "../Assets/Products/product4.png";

import Product_9 from "../Assets/Products/product5.png";
import Product_10 from "../Assets/Products/product6.png";
import Product_11 from "../Assets/Products/product7.png";
import Product_12 from "../Assets/Products/product8.png";
import Product_13 from "../Assets/Products/product9.jpg";

let StoreData = [
  {
    productID: 1,
    frontImg: Product_1,
    productName: "Anthurium",
    productPrice: 2000,
    category: "Indoor Plants", 
    description: "This plant has vibrant leaves and is easy to care for.",
    quantity: 3,
    longDescription: "Anthurium, often known as the flamingo flower or laceleaf, is a striking and elegant plant with glossy, heart-shaped leaves and vibrant, long-lasting blooms that radiate beauty. Its radiant spathes, ranging from fiery reds to soft pinks and whites, add a touch of tropical sophistication to any space. Known for its air-purifying qualities, this stunning plant thrives in indirect light and brings a sense of calm and luxury to its surroundings, making it the perfect addition to both modern and traditional interiors.",
    weight: "1.25 kg",
    dimensions: "60 x 30 x 80 cm",
  },
  {
    productID: 2,
    frontImg: Product_2,
    productName: "Alocasia Polly",
    productPrice: 5000,  
    category: "Indoor Plants", 
    description: "A rare plant that requires special care and attention.",
    quantity: 6,
    longDescription: "Alocasia Polly, also known as the African Mask Plant or Elephant Ear, is a captivating houseplant that commands attention with its striking, arrow-shaped leaves and dramatic, deep green veins. Its lush foliage, often highlighted by a glossy sheen, creates a bold contrast in any space, offering a sense of mystery and elegance. ",
    weight: "3.75 kg",
    dimensions: "90 x 60 x 90 cm",
  },
  {
    productID: 3,
    frontImg: Product_3,
    productName: "Calathea Medallion",
    productPrice: 1050,
    category: "Outdoor Plants", 
    description: "A delightful plant known for its unique foliage.",
    quantity: 5,
    weight: "1.25 kg",
    dimensions: "90 x 60 x 90 cm",
    longDescription: "Calathea Medallion is a stunning tropical plant that enchants with its vibrant, oval-shaped leaves adorned with intricate patterns of deep green and silver. The striking contrast between its glossy, dark green outer surface and the silvery veins makes it a showstopper in any indoor garden. Known for its ability to thrive in low light and humid environments, the Calathea Medallion adds an exotic touch to spaces, creating a lush and calming atmosphere.",
  },
  {
    productID: 4,
    frontImg: Product_4,
    productName: "Hoya Kerrii",
    productPrice: 7850,
    category: "Outdoor Plants",
    description: "A delightful plant known for its unique foliage.", 
    quantity: 10,
    weight: "1.25 kg",
    dimensions: "90 x 60 x 90 cm",
    longDescription: "Hoya Kerrii, often known as the 'Sweetheart Plant', is a charming and heart-shaped succulent that brings a touch of romance and greenery to any space. Its glossy, thick leaves grow in the shape of hearts, making it a popular choice for gifting and home décor. Native to Southeast Asia, this low-maintenance plant thrives in bright, indirect light and requires minimal watering, making it perfect for busy plant enthusiasts.",
  },
  {
    productID: 5,
    frontImg: Product_5,
    productName: "Fiddle Leaf",
    productPrice: 2210,
    category: "Indoor Plants", 
    description: "A low-maintenance plant that adds beauty to any space.",
    quantity: 12,
    weight: "1.25 kg",
    dimensions: "90 x 60 x 90 cm",
    longDescription: "The Fiddle Leaf Fig (Ficus lyrata) is a stunning indoor tree known for its large, glossy, violin-shaped leaves that bring a bold, sculptural presence to any room. With its striking foliage, this plant is a popular choice for modern, minimalist décor, adding a lush, tropical vibe to spaces. Native to West Africa, the Fiddle Leaf Fig thrives in bright, indirect light and, when well cared for, can grow into a tall, impressive feature in your home or office.",
  },
  {
    productID: 6,
    frontImg: Product_6,
    productName: "Cymbidium Orchid",
    productPrice: 5653,
    category: "Outdoor Plants", 
    description: "A rare plant that requires special care and attention.",
    quantity: 11,
    weight: "1.25 kg",
    dimensions: "90 x 60 x 90 cm",
    longDescription: "The Cymbidium Orchid is a captivating, elegant flower that exudes grace and beauty, making it a popular choice for both home décor and floral arrangements. Known for its long-lasting blooms and stunning array of colors, from soft pastels to vibrant reds and yellows, this orchid variety brings a touch of exotic sophistication to any space. Native to Asia, Cymbidiums thrive in cool, bright conditions and are prized for their ability to bloom during the winter months, brightening up the colder seasons with their exquisite flowers.",
  },
  {
    productID: 7,
    frontImg: Product_7,
    productName: "Bromeliad",
    productPrice: 3579,
    category: "Outdoor Plants", 
    description: "This plant has vibrant leaves and is easy to care for.",
    quantity: 6,
    weight: "1.25 kg",
    dimensions: "90 x 60 x 90 cm",
    longDescription: "The Bromeliad is a vibrant and exotic plant that adds a splash of color and a touch of tropical flair to any space. With its striking, brightly colored flowers and unique rosette shape, the Bromeliad is known for its long-lasting blooms, which can range from fiery reds and pinks to soft oranges and purples. This low-maintenance plant thrives in warm, humid environments and is perfect for bright, indirect light.",
  },
  {
    productID: 8,
    frontImg: Product_8,
    productName: "Variegated Rubber Plant",
    productPrice: 2900,
    category: "Indoor Plants", 
    description:
        "A beautiful plant that thrives in bright, indirect sunlight.",
    quantity: 9,
    weight: "1.25 kg",
    dimensions: "90 x 60 x 90 cm",
    longDescription: "The Variegated Rubber Plant (Ficus elastica) is a stunning and elegant houseplant that brings a touch of sophistication to any interior. With its glossy, leathery leaves adorned in beautiful shades of green, cream, and white, this plant offers a striking contrast that brightens any room. Known for its air-purifying qualities, the Variegated Rubber Plant thrives in bright, indirect light and requires minimal care, making it perfect for both novice and seasoned plant lovers.",
  },
  {
    productID: 9,
    frontImg: Product_9,
    productName: "Japanese Maple",
    productPrice: 6832,
    category: "Indoor Plants",
    description: "A delightful plant known for its unique foliage.", 
    quantity: 7,
    weight: "1.25 kg",
    dimensions: "90 x 60 x 90 cm",
    longDescription: "The Japanese Maple (Acer palmatum) is a breathtaking ornamental tree known for its delicate, finely-cut leaves that transform into vibrant hues of red, orange, and yellow in the fall. Native to Japan, this tree exudes elegance and charm, making it a perfect addition to any garden or landscape. ",
  },
  {
    productID: 10,
    frontImg: Product_10,
    productName: "Ghost Orchid",
    productPrice: 5836,
    category: "Outdoor Plants", 
    description: "A low-maintenance plant that adds beauty to any space.",
    quantity: 1,
    weight: "1.25 kg",
    dimensions: "90 x 60 x 90 cm",
    longDescription: "The Ghost Orchid (Dendrophylax lindenii) is an enigmatic and rare beauty, often regarded as one of the most mysterious and captivating orchids in the world. Known for its striking, translucent white flowers that resemble a delicate, floating apparition, the Ghost Orchid blooms in the wild, often in the misty swamps and dense forests of Florida and the Caribbean. Its ethereal appearance, combined with its elusive nature, has earned it a place in botanical lore and an air of intrigue.",
  },
  {
    productID: 11,
    frontImg: Product_11,
    productName: "Titan Arum",
    productPrice: 3535,
    category: "Outdoor Plants", 
    description: "A rare plant that requires special care and attention.",
    quantity: 15,
    weight: "1.25 kg",
    dimensions: "90 x 60 x 90 cm",
    longDescription: "The Titan Arum (Amorphophallus titanum), also known as the 'Corpse Flower', is a fascinating and awe-inspiring plant that holds the title for producing the largest unbranched flower in the world. Native to the rainforests of Sumatra, Indonesia, this rare and striking flower is renowned not only for its size but also for its pungent odor, which resembles the scent of rotting flesh. This unique fragrance is emitted to attract pollinators like carrion beetles and flies.",
  },
  {
    productID: 12,
    frontImg: Product_12,
    productName: "Variegated Monstera",
    productPrice: 9023,
    category: "Indoor Plants", 
    description: "This plant has vibrant leaves and is easy to care for.",
    quantity: 0,
    weight: "1.25 kg",
    dimensions: "90 x 60 x 90 cm",
    longDescription: "The Variegated Monstera (Monstera deliciosa variegata) is a striking and highly sought-after variation of the popular Monstera plant, known for its eye-catching, marbled leaves that showcase unique patterns of white, cream, and light green. This plant’s distinctive foliage is a result of a genetic mutation that creates a beautiful contrast against its natural dark green color.",
  },
  {
    productID: 13,
    frontImg: Product_13,
    productName: "Pitcher Plant",
    productPrice: 3456,  
    category: "Outdoor Plants", 
    description:
        "A beautiful plant that thrives in bright, indirect sunlight.",
    quantity: 5,
    weight: "1.25 kg",
    dimensions: "90 x 60 x 90 cm",
    longDescription: "The Pitcher Plant (Nepenthes) is a fascinating and unique carnivorous plant renowned for its stunning, tubular, pitcher-shaped leaves that trap and digest insects. Native to tropical regions, this plant's striking appearance and remarkable hunting technique make it a favorite among plant enthusiasts and collectors. The vibrant, colorful pitchers are designed to attract prey with their sweet nectar, and once an insect slips inside, it's unable to escape.",
  },
];

export default StoreData;
