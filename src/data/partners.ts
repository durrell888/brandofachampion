export interface Partner {
  id: string;
  name: string;
  logo?: string;
  website?: string;
  description?: string;
}

export const partners: Partner[] = [
  {
    id: "gatorade",
    name: "Gatorade",
    website: "https://www.gatorade.com",
  },
  {
    id: "nike",
    name: "Nike",
    website: "https://www.nike.com",
  },
  {
    id: "west-capital",
    name: "West Capital Wealth Management",
    website: "https://www.westcapitalwealth.com",
  },
  {
    id: "publix",
    name: "Publix",
    website: "https://www.publix.com",
  },
  {
    id: "walmart",
    name: "Walmart",
    website: "https://www.walmart.com",
  },
  {
    id: "q-collar",
    name: "Q Collar",
    website: "https://www.qcollar.com",
  },
  {
    id: "battle-sports",
    name: "Battle Sports",
    website: "https://www.battlesports.com",
  },
];
