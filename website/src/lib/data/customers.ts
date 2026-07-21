export interface Order {
  id: string;
  professionalId: string;
  packageId?: string;
  date: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  totalAmount: number;
}

export interface Transaction {
  id: string;
  orderId: string;
  date: string;
  amount: number;
  status: 'success' | 'failed' | 'pending';
  paymentMethod: 'card' | 'upi' | 'netbanking';
}

export interface WishlistItem {
  professionalId: string;
  addedAt: string;
}

export interface Customer {
  id: string;
  name: string;
  role: 'customer';
  email: string;
  mobile: string;
  profileImage: string;
  pincode: string;
  location: string;
  orders: Order[];
  transactions: Transaction[];
  wishlist: WishlistItem[];
}

export const customers: Customer[] = [
  {
    id: "c1",
    name: "Rajesh Kumar",
    role: "customer",
    email: "rajesh.kumar@example.com",
    mobile: "9876543210",
    profileImage: "https://randomuser.me/api/portraits/men/1.jpg",
    pincode: "400001",
    location: "Mumbai, MH",
    orders: [
      {
        id: "ord_101",
        professionalId: "p1",
        date: "2026-07-15",
        status: "confirmed",
        totalAmount: 15000
      },
      {
        id: "ord_102",
        professionalId: "v2",
        date: "2026-06-20",
        status: "completed",
        totalAmount: 12000
      }
    ],
    transactions: [
      {
        id: "txn_101",
        orderId: "ord_101",
        date: "2026-07-10",
        amount: 5000,
        status: "success",
        paymentMethod: "upi"
      },
      {
        id: "txn_102",
        orderId: "ord_102",
        date: "2026-06-15",
        amount: 12000,
        status: "success",
        paymentMethod: "card"
      }
    ],
    wishlist: [
      {
        professionalId: "p3",
        addedAt: "2026-07-01T10:00:00Z"
      },
      {
        professionalId: "s1",
        addedAt: "2026-07-05T14:30:00Z"
      }
    ]
  },
  {
    id: "c2",
    name: "Sneha Gupta",
    role: "customer",
    email: "sneha.g@example.com",
    mobile: "9123456789",
    profileImage: "https://randomuser.me/api/portraits/women/2.jpg",
    pincode: "110001",
    location: "New Delhi, DL",
    orders: [
      {
        id: "ord_201",
        professionalId: "p2",
        date: "2026-08-05",
        status: "pending",
        totalAmount: 8000
      }
    ],
    transactions: [
      {
        id: "txn_201",
        orderId: "ord_201",
        date: "2026-07-10",
        amount: 8000,
        status: "pending",
        paymentMethod: "netbanking"
      }
    ],
    wishlist: [
      {
        professionalId: "v1",
        addedAt: "2026-06-25T09:15:00Z"
      }
    ]
  },
  {
    id: "c3",
    name: "Amit Desai",
    role: "customer",
    email: "amit.desai@example.com",
    mobile: "9988776655",
    profileImage: "https://randomuser.me/api/portraits/men/3.jpg",
    pincode: "560001",
    location: "Bangalore, KA",
    orders: [],
    transactions: [],
    wishlist: [
      {
        professionalId: "p4",
        addedAt: "2026-07-08T11:20:00Z"
      },
      {
        professionalId: "s2",
        addedAt: "2026-07-09T16:45:00Z"
      }
    ]
  },
  {
    id: "c4",
    name: "Pooja Reddy",
    role: "customer",
    email: "pooja.reddy@example.com",
    mobile: "9871234567",
    profileImage: "https://randomuser.me/api/portraits/women/4.jpg",
    pincode: "500001",
    location: "Hyderabad, TS",
    orders: [
      {
        id: "ord_401",
        professionalId: "v4",
        date: "2026-05-12",
        status: "completed",
        totalAmount: 25000
      }
    ],
    transactions: [
      {
        id: "txn_401",
        orderId: "ord_401",
        date: "2026-05-10",
        amount: 25000,
        status: "success",
        paymentMethod: "card"
      }
    ],
    wishlist: []
  },
  {
    id: "c5",
    name: "Vikram Singh",
    role: "customer",
    email: "vikram.singh@example.com",
    mobile: "9012345678",
    profileImage: "https://randomuser.me/api/portraits/men/5.jpg",
    pincode: "411001",
    location: "Pune, MH",
    orders: [
      {
        id: "ord_501",
        professionalId: "p1",
        date: "2026-07-20",
        status: "confirmed",
        totalAmount: 18000
      },
      {
        id: "ord_502",
        professionalId: "s1",
        date: "2026-07-22",
        status: "confirmed",
        totalAmount: 12000
      }
    ],
    transactions: [
      {
        id: "txn_501",
        orderId: "ord_501",
        date: "2026-07-09",
        amount: 18000,
        status: "success",
        paymentMethod: "upi"
      },
      {
        id: "txn_502",
        orderId: "ord_502",
        date: "2026-07-09",
        amount: 12000,
        status: "success",
        paymentMethod: "netbanking"
      }
    ],
    wishlist: [
      {
        professionalId: "v5",
        addedAt: "2026-07-10T08:00:00Z"
      }
    ]
  }
];
