interface BaseItem {
  name: string;
  description: string;
  powerBonus: number;
  cost: number;
}

interface BaseItemWithUnlockRequirement extends BaseItem {
  unlockRequirement: string;
}

export type AccessoryCategory =
  | "hats"
  | "outfit"
  | "weapons"
  | "variousAccessories";

export type AccessoryCategoryTypes = {
  hats: BaseItem[];
  outfit: BaseItem[];
  weapons: BaseItemWithUnlockRequirement[];
  variousAccessories: BaseItemWithUnlockRequirement[];
};

type AccessorySubCategories = {
  [K in AccessoryCategory]: AccessoryCategoryTypes[K];
};

export type RequiredAccessoryCategories = Required<AccessorySubCategories>;

interface SkillsSubCategories {
  physicalSkills: BaseItem[];
  mentalSkills: BaseItemWithUnlockRequirement[];
  socialSkills: BaseItemWithUnlockRequirement[];
  technicalSkills: BaseItemWithUnlockRequirement[];
  magicalSkills: BaseItemWithUnlockRequirement[];
}

interface BusinessSubCategories {
  cryptoCurrency: BaseItemWithUnlockRequirement[];
  technology: BaseItemWithUnlockRequirement[];
  entertainment: BaseItemWithUnlockRequirement[];
  restoration: BaseItemWithUnlockRequirement[];
}

interface LifeStyleSubCategories {
  transportation: BaseItemWithUnlockRequirement[];
  accessories: BaseItemWithUnlockRequirement[];
  holidaysProperty: BaseItemWithUnlockRequirement[];
  exclusiveExperience: BaseItemWithUnlockRequirement[];
}

interface MainCategories {
  Accessory: AccessorySubCategories;
  Skills: SkillsSubCategories;
  Business: BusinessSubCategories;
  LifeStyle: LifeStyleSubCategories;
}
