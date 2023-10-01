import Good from '../Models/good';
import  resources from './resourcesdata';

const goods = {
    'Isocentered Magnet' : new Good('Isocentered Magnet', [resources['Cu (Copper)'], resources['Co (Cobalt)']]),
    'Tau Grade Rheostat': new Good('Tau Grade Rheostat', [resources['Cu (Copper)'], resources['Be (Beryllium)']]),
    'Austenitic Manifold': new Good('Austenitic Manifold', [resources['Ni (Nickel)'], resources['Fe (Iron)']]),
    'Isotopic Coolant': new Good('Isotopic Coolant', [resources['IL (Ionic Liquids)'], resources['xF4 (Tetrafluorides)']]),
    'Mag Pressure Tank': new Good('Mag Pressure Tank', [resources['Ni (Nickel)'], resources['Al (Aluminum)']]),
    'Reactive Gauge': new Good('Reactive Gauge', [resources['Al (Aluminum)'], resources['Cu (Copper)']]),
    'Zero Wire': new Good('Zero Wire', [resources['Ag (Silver)'], resources['Cu (Copper)']])
};

goods['Comm Relay'] = new Good('Comm Relay', [goods['Isocentered Magnet'], goods['Tau Grade Rheostat']]);
goods['Monopropellant'] = new Good('Monopropellant', [goods['Mag Pressure Tank'], resources['HnCn (Alkanes)']]);

export default goods;