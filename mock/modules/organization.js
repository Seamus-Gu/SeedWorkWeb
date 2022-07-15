/*
 * @Description:
 * @Autor: Gu
 * @Date: 2022-01-12 15:36:44
 */
const organizationTable = [
  {
    id: '100',
    nodeLevel: 1,
    treeIds: '',
    organizationName: '沈阳昂立控股集团',
    organizationStatus: '0',
    children: [
      {
        id: '010',
        nodeLevel: 2,
        treeIds: '100',
        organizationName: '昂立集团',
        organizationStatus: '0',
        children: [
          {
            id: '011',
            nodeLevel: 3,
            treeIds: '100,010',
            organizationName: '昂立信息',
            organizationStatus: '0',
            children: []
          }
        ]
      },
      {
        id: '020',
        nodeLevel: 2,
        treeIds: '001',
        organizationName: '运维',
        organizationStatus: '0',
        children: []
      }
    ]
  }
]

const organizationMockList = [
  {
    url: '/api/system/organization/list',
    method: 'get',
    response: () => {
      return {
        code: 200,
        message: 'success',
        data: organizationTable
      }
    }
  }
]

export default organizationMockList
