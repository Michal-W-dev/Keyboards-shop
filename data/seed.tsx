const products = [
  {
    name: 'CORSAIR K63',
    images: ['/images/K63_1.jpg', '/images/K63_2.jpg'],
    description: 'Uncompromised wireless, mechanical performance',
    descriptionLong: 'Experience ultimate gaming freedom with the CORSAIR K63 Wireless Mechanical Gaming Keyboard, featuring ultra-fast 1ms 2.4GHz wireless technology with CHERRY® MX mechanical keyswitches packed into a portable, tenkeyless design.',
    brand: 'CORSAIR',
    category: 'Mechanical',
    switches: 'Cherry MX Red',
    price: 560.41,
    countInStock: 10,
    rating: [5, 5, 5, 3, 4, 5, 1],
    numReviews: 12,
  },
  {
    name: 'ROCCAT Vulcan 122',
    images: ['/images/ROCCAT-Vulcan-122_1.jpg', '/images/ROCCAT-Vulcan-122_2.jpg'],
    description: 'Developed for gamers who love the feel of mechanical switches',
    descriptionLong: 'A marvel of German engineering that delivers the industry’s best in speed and responsiveness. The switch adds to a comprehensive feature set that gamers know and love. The low-profile design is engineered for comfort and to reduce fatigue. Impressive durability and build quality thanks to its silver reinforcing anodized aluminum top plate, and switch housings designed to resist dust and dirt build-up.',
    brand: 'ROCCAT',
    category: 'Mechanical',
    switches: 'Titan Tactile',
    price: 574.00,
    countInStock: 7,
    rating: [5, 5, 5, 1, 4, 5, 1],
    numReviews: 8,
  },
  {
    name: 'DELL Alienware AW510K',
    images: ['/images/DELL-Alienware-AW510K-RGB-skos.jpg', '/images/DELL-Alienware-AW510K-RGB-bok.jpg'],
    description: 'A beautifully designed, full-featured gaming keyboard. Made for ultimate performance.',
    descriptionLong: 'Take down the enemy with industry-leading Cherry MX low profile Red switches. The combination of linear switching characteristics, low actuation force and shorter travel gives you better control as well as quick and smooth triggering, allowing you to efficiently pick off adversaries one by one. Key durability of 50 million keystrokes with no loss of quality. Fully programmable keys for macros and key assignments.',
    brand: 'DELL',
    category: 'Mechanical',
    switches: 'Cherry MX Red',
    price: 699.00,
    countInStock: 5,
    rating: [5, 5, 3, 2, 4, 5, 2],
    numReviews: 12,
  },
  {
    name: 'SPC GEAR GK550',
    images: ['/images/GK550_1.jpg', '/images/GK550_2.jpg'],
    description:
      'Universal of mechanical keyboard, which will prove itself as much in gaming as in office work',
    descriptionLong: "The SPC Gear GK550 Omnis Kailh Brown RGB gaming keyboard represents the optimal resource for every red-blooded gamer who wants to move their game to a whole new level in the world of games. The keyboard's prompt response and tough and rugged keys give your fingers excellent traction, so you won't miss a single enemy. The pleasantly compact size of the keyboard also gives you more space for your calculated mouse moves.",
    brand: 'SPC',
    category: 'Mechanical',
    switches: 'Kailh Blue',
    price: 299.99,
    countInStock: 11,
    rating: [5, 5, 5, 4, 4, 5, 5],
    numReviews: 12,
  },
  {
    name: 'HP Pavilion 600',
    images: ['/images/Pavilion_600_1.jpg', '/images/Pavilion_600_2.jpg'],
    description:
      'Eye-catching design is as close as your fingertips with a slim wireless keyboard.',
    descriptionLong: 'Boost efficiency and productivity with an incredible three-zone keyboard with full-size arrow keys and a number pad. A slim, appealing design, this wireless keyboard blends seamlessly into your home. Optimized keys for a tactile feel and a responsive, quiet typing experience.',
    brand: 'HP',
    category: 'Membrane',
    switches: '-',
    price: 179.00,
    countInStock: 7,
    rating: [3, 1, 2, 1, 2, 1, 1],
    numReviews: 10,
  },
  {
    name: 'STEELSERIES Apex 5',
    images: ['/images/STEELSERIES-Apex-5-ukos-prawy.jpg', '/images/STEELSERIES-Apex-5-bok-lewy.jpg'],
    description:
      'Combines the smoothness of a membrane switch with the added durability, performance of a mechanical switch.',
    descriptionLong: 'The Apex 5 is for a premium gaming experience where you don’t have to choose one over the other. Customize the OLED screen with your favorite gifs, view on-the-fly game info, incoming Discord messages, settings, and more. The Series 5000 metal frame is manufactured for a lifetime of unbreakable durability and sturdiness, making it the perfect centerpiece of any high-end setup. ',
    brand: 'STEELSERIES',
    category: 'Hybrid',
    switches: 'Blue',
    price: 549.99,
    countInStock: 0,
    rating: [3, 2, 2, 1, 4, 3, 4],
    numReviews: 12,
  },
]

export const newProduct = () => {
  fetch(`${process.env.NEXT_PUBLIC_DB_URL}/products.json`, {
    method: 'POST',
    body: JSON.stringify(products[5]),
    headers: { 'Content-Type': 'application/json' }
  })
    .then(res => {
      if (!res.ok) throw Error('Something went wrong')
      return res.json()
    })
    .then(data => console.log('id ', data.name))
    .catch(err => console.log('err ', err.message || 'Something went wrong!'))
}


export default products
