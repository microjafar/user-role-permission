import Unit from '../../views/unit/Unit.vue'
import UnitCreate from '../../views/unit/UnitCreate.vue'
import UnitEdit from '../../views/unit/UnitEdit.vue'
import UnitList from '../../views/unit/UnitList.vue'
export default [{
    path: 'unit',
    name: 'Unit',
    component: Unit,
    children: [{
            path: '',
            name: 'UnitList',
            component: UnitList,
            meta: {
                permissions: ['Unit Read']
            }
        },
        {
            path: 'create',
            name: 'UnitCreate',
            component: UnitCreate,
            meta: {
                permissions: ['Unit Create']
            }
        },
        {
            path: 'update',
            name: 'UnitEdit',
            component: UnitEdit,
            meta: {
                permissions: ['Unit Update']
            }
        }
    ]
}];