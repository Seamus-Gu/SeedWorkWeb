/*
 * @Description:
 * @Autor: Gu
 * @Date: 2022-01-12 15:36:44
 */
const deptTable = [
  {
    id: '100',
    nodeLevel: 1,
    treeIds: '',
    deptName: '沈阳昂立控股集团',
    deptStatus: '0',
    children: [
      {
        id: '010',
        nodeLevel: 2,
        treeIds: '100',
        deptName: '昂立集团',
        deptStatus: '0',
        children: [
          {
            id: '011',
            nodeLevel: 3,
            treeIds: '100,010',
            deptName: '昂立信息',
            deptStatus: '0',
            children: []
          }
        ]
      },
      {
        id: '020',
        nodeLevel: 2,
        treeIds: '001',
        deptName: '运维',
        deptStatus: '0',
        children: []
      }
    ]
  }
]

const deptMockList = [
  {
    url: '/api/system/dept/list',
    method: 'get',
    response: () => {
      return {
        code: 200,
        message: 'success',
        data: deptTable
      }
    }
  }
]

export default deptMockList
