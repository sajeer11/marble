
import { Product ,RangeCategory } from './types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Statuario Gold Marble',
    category: 'Marble, Slabs',
    price: 2500000,
    originalPrice: 3000000,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDP5UfmFj-JMV0zzG-BTZE1AkPhFqyLOtXAV2vFt2aLOiutZ883HcM18UQDKG58q7Jjk8xftF511Dza9VG6TZWE3NYWqhItM1yWEJHuFg--ZB_LCeaWvTaeYoRt8PmzDuzSbnkzqlRlIG8eTtDd1BMIfT6hwoXyzvWsdImPwb9b-LQfB7ORRXSEFnKc-zdokaUv9PS7xFD8Fpb5SvmmLe7iK9wJQAk-AZl0xyg8iSBjPknIu1rFepZBuMAx2zP8_u3NuauHXgA1VwI',
    description: 'Elevate your interiors with the timeless elegance of Statuario Gold Marble. Sourced from the finest quarries in Carrara, Italy.',
    tag: '-15%'
  },
  {
    id: '2',
    name: 'Carrara White',
    category: 'Marble, Tiles',
    price: 1500000,
    originalPrice: 2142000,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDpmCTkmz--65MyS02Bw7P8IC7qTt8KE4xdLsFM1MARZNhXNkOlY9JsYYB2UvKVGkjROdk2JvnX7tEpP8P94_Pekiqck7ZLmnPIJHWJbL0W0nBzBig0i2jbD9tBC49IEtwITziXfFIoZ7NqhcoYJ9UP97JLW8F7G_ewwW1_CdveEYjI8uWKS1VoeU9EfQZyI-cswzFbDWZmwAFsyljcJi6xTG988ku4Z2ZiD31PRiR0p0aVpQK-LSsAXGbcGdJPUlcvtiqBdaBrjrM',
    description: 'Classic Italian marble known for its consistent grey-white background.',
    tag: '-30%'
  },
  {
    id: '3',
    name: 'Nero Marquina',
    category: 'Marble, Slabs',
    price: 3200000,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCfdZ6dShfN1F5oL8CSSTvaxA2Rb9VWq0zK3cAKGYEiCb08QBZ_DqOpbG8k0nSCRpYxeqlv_4U9QnuK9YEt-gQVMIrjbuACvi0HmhCroqheO5dbPyzNz1KxW7iJD1U8TSJOoeuDW3j6NRUyW5ULaDt_sHilsEWl-EfHzIazaHfJIE6dfYMc6rA_6PcHQBKUQyKHIm8oWVf7qKz_ld3SgvsObqxeXIXPUKEJ_1LZhlbKgKpuxoFZZtzqrCkAjaarsNNu4gs09qzhfyQ',
    description: 'Deep black marble with distinctive white veins. A bold statement piece.'
  },
  {
    id: '4',
    name: 'Emperador Dark',
    category: 'Natural Stone, Tiles',
    price: 2800000,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCHBJvELRQb-c1vImB6eGL5hMmMbfCjo1Y3F_ZcN2YF9OenoFgNq7TgGaGRbIIhQmmPsmRAuaPVohsLovuIUJyPd9VOzH0LQJldbMd4058hKTepvDn3bBaHuIV0Lf9AG8ytR0dNMn_YMMWlzIBlK2m4sQ9B8CzoO2peExq6hj1kY7JwhT8OSYWeO4pkusp9hwlYqkHx5TBC63E7GcSDpXjBIV8IjYa_I_JcMX8WUiQ4Uj9eDpL7qBUG6Co6wxooTFwIJQ7AUaDZnUk',
    description: 'Rich dark brown marble with intricate light spider-web veining.',
    tag: 'New'
  },
  {
    id: '5',
    name: 'Calacatta Gold',
    category: 'Slabs',
    price: 3500000,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBwcBd87bxzevt_A0nLoNhdDRnvwpjGNHx8IeFJO3JlzYUM7p50Havu_JGX8p_IwhEE1C-xSgT9gUdneGyoVbLx7ItV8_Ugp9KewvFPtFY3DxQl0Nujur6Ous2_YrqZGSFfZ65VE5OgSusucCnN_qMgNWZnh-XJ7IMrOPyZ2LG8bVUPxhKBdl14Q6n08DDNVxqoIK5djXaR3EvRyqSPbEfcXA9bnQroKxg6Ge0kzOW1E3dh73-dUWor6y6XxflymrbA9XNTBald5Eg',
    description: 'Luxurious white marble with dramatic gold and grey veining.',
    tag: 'Best Seller'
  },
  {
    id: '6',
    name: 'Arabescato Corchia',
    category: 'Slabs',
    price: 2300000,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBQF8lIyeV82ts65KRK6wt0YHjKpZ2T7piXhLSkx6litwi9YNNdlPRpUJnP0y9WjkIiQheWzWTwnQFkye6Cqf_m9yJ77hrJhJkaGhCK6KIYT1G39UAOJCg0pUPdDM7js60PzeKFAHrI-9ZAOmYH_iomZSzTEX3pSAa5gNknoSaCO0J45zNtg_yNx7C4WfYoDDLw1cwTrJzDwH3tVVpvlSgijV_RDXv9vwqBSysENeCmo7LHrT9CWM-ucWKdBouKhJJWkzoFWs2D2LU',
    description: 'High contrast marble with unique circular patterns.',
    tag: 'New'
  }
];

export const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Shop', path: '/shop' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];


export const GALLERY_IMAGES = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDpc4oD8k5D3EoYeiULS53TTttB2v-II-U-zK_-iHmcPrq8TILtF9CHxPjNGdu_e5w_YB5HWgHTgZ9pcM_taLeaCBF-UuNL0hMDEbMtxye2abJMiAU5sofis0ufCfqI9o2G77m6YhzIglbsZX3ckAyVPDxnQe0kA_qx1_vLEuXXnGwPCDsLOlnGLmHDnpSu5ih5yg09eo-yIEa0e4D-97HFd5_CPvIcZ_pd7ck7j-TJGuv5kQpzWLNGEWdXz_Uta73MJjDhvCUUpqg",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBtJAvbb0dWQrZILSMAvU3Tfd-coIaA38KNCXJODpOJiX8NSZ-DmYvOgQbq6AtC82tACqsoYoc40YVDSk8xBMAp1FD0VP-7Ax52VmVP0-x_h-jAd-AI2n2-lpO-XLugvduCsNNF1TCJReZQYLu_OKiVEemEjwUSCIOWxAgIvBCbxV-IIeUfutk0Ti4Yki5U0GT8ImOGdPQ2NezTDOnrvD95qFCRS1wKY1_91b1_SM5c5sIfY0ad-QK9kIk2-SqS237hoPX_WdR_Ji8",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAlOAwmgZJYg58MfNIch33fGdW-r9h-sd7FeJMg1PXwf4N6JVZ2z848CVjNnlvm7K5baiImsCRjH5AaIBNDbVdB6VR9peD1WOFRCYQ-vL0JPGh0AmZeb3w_9fqjYuNnlztdPBHv8TSYQcfVBi5-1vOJc-pMg9j2CxjvLvv2-MNFZSJJdrmzE7soB5dlmmyV_vBhE1e7me_JEUa_YnRKHab-l-1o8a8FXoSImPAxPNKCirt1t4xGVJ0p8q39EWmsYi1zPhPwVvg1oXI",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBiUkNtYvpj8DEPUkaC_nyFgLnmxiVbD4hCOS2CEDREgYoPDoUEuFKbTkbJbzpuEs6Uw7IJjc-eD4bjc3DbeDYcQ1nfEnG6cfSV-hdnJ_aI46DuN8h0W3fdFzG2nF3obGIqI5DW-hcnyPoLqcYu9tL1vnF0PDozDhQzS_r2cd0r3DGAqf5wHoGk04FesO9j52coE5C7sz6KCGryJSz-UkibTjV_3NJcOiIoBX0JPQEyUzMwvgj2EnIOFCrIgC-Q_mutEhhKqYc6tV0",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDAIV3sLHhctW8AReEXVlk_t8b0MnxL7Hat0_2J_uW2CTyVk9Yzs-0sx5g98IdXG_4qT6NrJuUZPQ4hwbjLKmjRqBKYbVhCcPZYQCZyLXo3CP1yZPq3g2scQj06M8UBA3bLfw4_rxkYFZDVbwq81ug-ZX18WqKdOFsOr-ZuXHweJTCJI6u99XaLxQrzzyQ-vBpeg64lVWRv5TX-Eom3LvHlWgJgRBVfYAztXR0kedu5fsDZ112hjhlELziNqjhKeM3sPze5z3sodjg",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuACCDL-CF76q4wEwH4M9i9VzKm9p57a_yzj_FzfkS4BuuGQTzuzr8LIgkT-Z0ZrLRdghN0XG2xB-DyFeK8bDME5KOXkSGjlz-NvShQg6_U076qk2QzaCVa0iJso9VjkHFH-9_F1N0ZhAvd9BEAGHTFmKiKI5B2C8cVjPTE-Q-rQW771cXb_hNSgVUeOrWgS38jcHbqjzk8uGYnghtEvhkViKga6Kc9fd1CoRsXMENVy0Kv_IyJfl0y2COsPucaOsi_6q-8-TMjDD-E",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDHIO45EabtYTYLMVw35IcdXwOw8FD_1swqQ3n5Tu2l_Z1Zt96_n5LJSXo_laqIf-j9kTGJr6CdXSmx3xkrtNZgc18VfEj3dOfmH2NJPpr52bAA049m2DG4UNSX5wAWNbfxRFHnyFPQ9CDTBdZJhJNh7Uap4TLjfCHBXlTf8IWM9DqKc_RAnSnv4HRB5j6b1GDDzsp9aqVgZ-5fKOvMsnMgJovbcJibU6CF-1yMPn76mWARHQEykB27nQvQ8RAbjB4JMcXv347OHk8"
];




import { Order, User } from './types';

export const MOCK_USER: User = {
  name: "Julianne Moore",
  email: "julianne.m@example.com",
  membershipDate: "Oct 2023",
  membershipType: "Premium Member",
  avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200&h=200"
};

export const MOCK_ORDERS: Order[] = [
  {
    id: "#MC-94281",
    date: "Oct 12, 2023",
    amount: 1450.00,
    status: "In Transit",
    summary: "Marble Coffee Table + 2 items",
    products: [
      { id: "1", name: "Marble Coffee Table", image: "https://picsum.photos/seed/marble1/100/100" },
      { id: "2", name: "Marble Coaster Set", image: "https://picsum.photos/seed/marble2/100/100" },
    ]
  },
  {
    id: "#MC-89104",
    date: "Sep 28, 2023",
    amount: 320.00,
    status: "Delivered",
    summary: "Carrara Marble Lamp",
    products: [
      { id: "3", name: "Carrara Marble Lamp", image: "https://picsum.photos/seed/marble3/100/100" }
    ]
  },
  {
    id: "#MC-87522",
    date: "Aug 15, 2023",
    amount: 4800.00,
    status: "Delivered",
    summary: "Black Marble Dining Table + Chairs",
    products: [
      { id: "4", name: "Black Marble Table", image: "https://picsum.photos/seed/marble4/100/100" },
      { id: "5", name: "Designer Chair", image: "https://picsum.photos/seed/chair1/100/100" }
    ]
  },
  {
    id: "#MC-82103",
    date: "Jun 20, 2023",
    amount: 3150.00,
    status: "Processing",
    summary: "Statuario Polished Tiles",
    products: [
      { id: "6", name: "Statuario Tiles", image: "https://picsum.photos/seed/tile1/100/100" }
    ]
  }
];
