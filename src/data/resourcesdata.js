import * as Resources from '../Constants/resources';

function createResource(name, isLinkResource = false) {
    return {
        name,
        isLinkResource,
        // ... any other properties you want each resource to have
    };
}

const resources = {
    [Resources.COPPER]: createResource(Resources.COPPER),
    [Resources.COBALT]: createResource(Resources.COBALT),
    [Resources.BERYLLIUM]: createResource(Resources.BERYLLIUM),
    [Resources.SILVER]: createResource(Resources.SILVER),
    [Resources.ALUMINUM]: createResource(Resources.ALUMINUM),
    [Resources.NICKEL]: createResource(Resources.NICKEL),
    [Resources.IONIC_LIQUIDS]: createResource(Resources.IONIC_LIQUIDS),
    [Resources.TETRAFLUORIDES]: createResource(Resources.TETRAFLUORIDES),
    [Resources.ALKANES]: createResource(Resources.ALKANES),
    [Resources.IRON]: createResource(Resources.IRON),
    [Resources.WATER]: createResource(Resources.WATER, true),
    [Resources.HELIUM]: createResource(Resources.HELIUM, true),
    [Resources.LEAD]: createResource(Resources.LEAD, true),
    [Resources.CHLORINE]: createResource(Resources.CHLORINE, true),
    [Resources.ARGON]: createResource(Resources.ARGON, true),
    [Resources.URANIUM]: createResource(Resources.URANIUM, true),
    [Resources.CHLOROSILANES]: createResource(Resources.CHLOROSILANES, true),
    [Resources.IRIDIUM]: createResource(Resources.IRIDIUM, true),
    [Resources.TUNGSTEN]: createResource(Resources.TUNGSTEN, true),
    [Resources.FLUORINE]: createResource(Resources.FLUORINE, true),
    [Resources.BENZENES]: createResource(Resources.BENZENES, true),
    [Resources.TITANIUM]: createResource(Resources.TITANIUM, true),
    [Resources.LITHIUM]: createResource(Resources.LITHIUM, true),
    [Resources.GOLD]: createResource(Resources.GOLD, true),
    [Resources.TANTALUM]: createResource(Resources.TANTALUM, true),
    [Resources.PLATINUM]: createResource(Resources.PLATINUM, true),
    [Resources.VANADIUM]: createResource(Resources.VANADIUM, true),
    [Resources.NEODYMIUM]: createResource(Resources.NEODYMIUM, true),
    [Resources.CARBOXYLIC_ACIDS]: createResource(Resources.CARBOXYLIC_ACIDS, true),
    [Resources.MERCURY]: createResource(Resources.MERCURY, true),
    [Resources.CAESIUM]: createResource(Resources.CAESIUM, true),
    [Resources.PALLADIUM]: createResource(Resources.PALLADIUM, true),
    [Resources.NEON]: createResource(Resources.NEON, true),
    [Resources.EUROPIUM]: createResource(Resources.EUROPIUM, true),
    [Resources.PLUTONIUM]: createResource(Resources.PLUTONIUM, true),
    [Resources.XENON]: createResource(Resources.XENON, true),
    [Resources.YTTERBIUM]: createResource(Resources.YTTERBIUM, true),
    [Resources.ANTIMONY]: createResource(Resources.ANTIMONY, true),
    [Resources.ALDUMITE]: createResource(Resources.ALDUMITE, true),
    [Resources.AQUEOUS_HEMATITE]: createResource(Resources.AQUEOUS_HEMATITE, true),
    [Resources.CAELUMITE]: createResource(Resources.CAELUMITE, true),
    [Resources.DYSPROSIUM]: createResource(Resources.DYSPROSIUM, true),
    [Resources.INDICITE]: createResource(Resources.INDICITE, true),
    [Resources.ROTHICITE]: createResource(Resources.ROTHICITE, true),
    [Resources.TASINE]: createResource(Resources.TASINE, true),
    [Resources.VERYL]: createResource(Resources.VERYL, true),
    [Resources.VYTINIUM]: createResource(Resources.VYTINIUM, true)
};
export default resources;