// Marker Assets
import LunchMarker from "../assets/markers/regular/foods-pin.svg";
import DrinkMarker from "../assets/markers/regular/drinks-pin.svg";
import BothMarker from "../assets/markers/regular/food-and-drink.svg";
import CoffeeMarker from "../assets/markers/regular/coffee-pin.svg";
import NewLunchMarker from "../assets/markers/regular/lunch.gif";
import NewDrinkMarker from "../assets/markers/regular/drink.gif";
import NewBothMarker from "../assets/markers/regular/all.gif";
import NewCoffeeMarker from "../assets/markers/regular/coffee.gif";
import PartnerLunchMarker from "../assets/markers/partner/lunch.svg";
import PartnerDrinkMarker from "../assets/markers/partner/drinks.svg";
import PartnerBothMarker from "../assets/markers/partner/all.svg";
import PartnerCoffeeMarker from "../assets/markers/partner/coffee.svg";
import PartnerNewLunchMarker from "../assets/markers/partner/lunch.gif";
import PartnerNewDrinkMarker from "../assets/markers/partner/drink.gif";
import PartnerNewBothMarker from "../assets/markers/partner/all.gif";
import PartnerNewCoffeeMarker from "../assets/markers/partner/coffee.gif";

// Types for categories and configurations
type MarkerCategory = "lunch" | "drink" | "ct" | "both";
type MarkerConfigKey = "regular" | "new" | "partner" | "partnerNew";

const markerConfig: Record<MarkerConfigKey, Record<MarkerCategory, string>> = {
  regular: {
    lunch: LunchMarker,
    drink: DrinkMarker,
    ct: CoffeeMarker,
    both: BothMarker,
  },
  new: {
    lunch: NewLunchMarker,
    drink: NewDrinkMarker,
    ct: NewCoffeeMarker,
    both: NewBothMarker,
  },
  partner: {
    lunch: PartnerLunchMarker,
    drink: PartnerDrinkMarker,
    ct: PartnerCoffeeMarker,
    both: PartnerBothMarker,
  },
  partnerNew: {
    lunch: PartnerNewLunchMarker,
    drink: PartnerNewDrinkMarker,
    ct: PartnerNewCoffeeMarker,
    both: PartnerNewBothMarker,
  },
};

const getMarkerSymbol = (
  category: MarkerCategory,
  isPartner: boolean | null,
  isNew: boolean | null
) => {
  // Default to 'regular' if no new or partner flag is set
  let configKey: MarkerConfigKey = "regular";

  if (isPartner) {
    configKey = isNew ? "partnerNew" : "partner";
  } else if (isNew) {
    configKey = "new";
  }

  // Ensure proper key access by explicitly specifying `configKey`'s type
  const url = markerConfig[configKey][category] || markerConfig.regular.lunch;

  return {
    type: "picture-marker",
    url,
    width: 42,
    height: 52,
  };
};

export default getMarkerSymbol;
