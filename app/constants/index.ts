import { TbBeach, TbMountain, TbPool } from 'react-icons/tb';
import {
  GiWindmill,
  GiIsland,
  GiBoatFishing,
  GiCastle,
  GiForestCamp,
  GiCaveEntrance,
  GiCactus,
  GiBarn,
} from 'react-icons/gi';
import { BsSnow } from 'react-icons/bs';
import { FaSkiing } from 'react-icons/fa';
import { IoDiamond } from 'react-icons/io5';
import { MdOutlineVilla } from 'react-icons/md';

export const categories = [
  {
    label: 'Beach',
    icon: TbBeach,
    description: 'this property is close to the beach!',
  },
  {
    label: 'Windmills',
    icon: GiWindmill,
    description: 'this property has windmills',
  },
  {
    label: 'Modern',
    icon: MdOutlineVilla,
    description: 'this property is modern',
  },
  {
    label: 'Countryside',
    icon: TbMountain,
    description: 'this property is in the countryside',
  },
  {
    label: 'Pools',
    icon: TbPool,
    description: 'this property has a pool',
  },
  {
    label: 'Islands',
    icon: GiIsland,
    description: 'this property is on an island',
  },
  {
    label: 'Lake',
    icon: GiBoatFishing,
    description: 'this property is to a lake',
  },
  {
    label: 'Skiing',
    icon: FaSkiing,
    description: 'this property has skiing activities',
  },
  {
    label: 'Castles',
    icon: GiCastle,
    description: 'this property is in a castle',
  },
  {
    label: 'Camping',
    icon: GiForestCamp,
    description: 'this property has camping activities',
  },
  {
    label: 'Arctic',
    icon: BsSnow,
    description: 'this property has camping activities',
  },
  {
    label: 'Cave',
    icon: GiCaveEntrance,
    description: 'this property is a cave',
  },
  {
    label: 'Desert',
    icon: GiCactus,
    description: 'this property is in the desert',
  },
  {
    label: 'Barns',
    icon: GiBarn,
    description: 'this property is in the barn',
  },
  {
    label: 'Lux',
    icon: IoDiamond,
    description: 'this property is luxurious',
  },
];
