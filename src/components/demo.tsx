import { useTranslations } from "next-intl";
import { BusinessUpgrades } from "@/data/upgrades";
import UpgradeItemCard from "./UpgradeItemCard";

import { AccessoryCategoryTypes } from "@/types/AccessoryTypes";

export default function Business() {
  return (
    <>
      {Object.keys(BusinessUpgrades).map((category) => {
        const typedCategory = category as keyof AccessoryCategoryTypes;

        return (
          <div key={typedCategory}>
            <h2 className="text-base mt-8">{category}</h2>
            <div className="mt-4">
              {BusinessUpgrades[typedCategory].map((item, index) => "hello")}
            </div>
          </div>
        );
      })}
    </>
  );
}
