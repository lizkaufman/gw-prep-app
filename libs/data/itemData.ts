import { ItemDetails } from "../../components/itemCards/interfaces";
import productImages from "../images/products";

const {
  battletome,
  warscrollCards,
  dice,
  vanguard,
  blissbarbArchers,
  blissbarbSeekers,
  daemonettes,
  fiends,
  myrmideshPainbringers,
  symbareshTwinsouls,
  shardspeaker,
  sigvaldPrinceOfSlaanesh,
  synessaTheVoiceOfSlaanesh,
  lordOfHubris,
  lordOfPain,
} = productImages;

const itemData: ItemDetails[] = [
  {
    id: 0,
    name: "Battletome",
    price: "£35",
    image: battletome,
  },
  {
    id: 1,
    name: "Warscroll Cards",
    price: "£22",
    image: warscrollCards,
  },
  {
    id: 2,
    name: "Slaanesh Dice",
    price: "£25",
    image: dice,
  },
  {
    id: 3,
    name: "Vanguard: Hedonites of Slaanesh",
    price: "£85",
    image: vanguard,
  },
  {
    id: 4,
    name: "Blissbarb Archers",
    price: "£35",
    image: blissbarbArchers,
  },
  {
    id: 5,
    name: "Blissbarb Seekers",
    price: "£42.50",
    image: blissbarbSeekers,
  },
  {
    id: 6,
    name: "Daemonettes",
    price: "£25",
    image: daemonettes,
  },
  {
    id: 7,
    name: "Fiends",
    price: "£35",
    image: fiends,
  },
  {
    id: 8,
    name: "Myrmidesh Painbringers",
    price: "£37.50",
    image: myrmideshPainbringers,
  },
  {
    id: 9,
    name: "Symbaresh Twinsouls",
    price: "£37.50",
    image: symbareshTwinsouls,
  },
  {
    id: 10,
    name: "Shardspeaker of Slaanesh",
    price: "£20",
    image: shardspeaker,
  },
  {
    id: 11,
    name: "Sigvald, Prince of Slaanesh",
    price: "£37.50",
    image: sigvaldPrinceOfSlaanesh,
  },
  {
    id: 12,
    name: "Synessa, the Voice of Slaanesh",
    price: "£75",
    image: synessaTheVoiceOfSlaanesh,
  },
  {
    id: 13,
    name: "Lord of Hubris",
    price: "£22.50",
    image: lordOfHubris,
  },
  {
    id: 14,
    name: "Lord of pain",
    price: "£20",
    image: lordOfPain,
  },
];

export default itemData;
