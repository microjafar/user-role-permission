import Lab from '../../views/lab/Lab.vue'
import LabCreate from '../../views/lab/LabCreate.vue'
import LabEdit from '../../views/lab/LabEdit.vue'
import LabList from '../../views/lab/LabList.vue'
export default [{
    path: 'lab',
    name: 'Lab',
    component: Lab,
    children: [{
            path: '',
            name: 'LabList',
            component: LabList,
            meta: {
                permissions: ['Lab Read']
            }
        },
        {
            path: 'create',
            name: 'LabCreate',
            component: LabCreate,
            meta: {
                permissions: ['Lab Create']
            }
        },
        {
            path: 'update',
            name: 'LabEdit',
            component: LabEdit,
            meta: {
                permissions: ['Lab Update']
            }
        }
    ]
}];