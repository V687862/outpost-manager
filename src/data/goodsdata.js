import * as Resources from '../Constants/resources';
import * as Goods from '../Constants/goods';


function createGood(name, components) {
    return {
        name,
        components,
    };
}
const goods = {
    [Goods.ISOCENTERED_MAGNET]: createGood(Goods.ISOCENTERED_MAGNET, [Resources.COPPER, Resources.COBALT]),
    [Goods.TAU_GRADE_RHEOSTAT]: createGood(Goods.TAU_GRADE_RHEOSTAT, [Resources.COPPER, Resources.BERYLLIUM]),
    [Goods.AUSTENITIC_MANIFOLD]: createGood(Goods.AUSTENITIC_MANIFOLD, [Resources.NICKEL, Resources.IRON]),
    [Goods.ISOTOPIC_COOLANT]: createGood(Goods.ISOTOPIC_COOLANT, [Resources.IONIC_LIQUIDS, Resources.TETRAFLUORIDES]),
    [Goods.MAG_PRESSURE_TANK]: createGood(Goods.MAG_PRESSURE_TANK, [Resources.NICKEL, Resources.ALUMINUM]),
    [Goods.REACTIVE_GAUGE]: createGood(Goods.REACTIVE_GAUGE, [Resources.ALUMINUM, Resources.COPPER]),
    [Goods.ZERO_WIRE]: createGood(Goods.ZERO_WIRE, [Resources.SILVER, Resources.COPPER]),
    [Goods.COMM_RELAY]: createGood(Goods.COMM_RELAY, [Goods.ISOCENTERED_MAGNET, Goods.TAU_GRADE_RHEOSTAT]),
    [Goods.MONOPROPELLANT]: createGood(Goods.MONOPROPELLANT, [Goods.MAG_PRESSURE_TANK, Resources.ALKANES]),
};
export default goods;