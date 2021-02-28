/*
 * @Author: changluo
 * @Description: 获取权限
 */
// src/access.ts
export default function(initialState:{ currentUser?: API.CurrentUser | undefined }) {
    console.log('initialState',initialState);
    const { currentUser={} } = initialState;
    return {
      canReadFoo: true,
      canAdmin: currentUser && currentUser.access === 'admin',
      canDeleteFoo: (curRoute:any) => {
        if(curRoute){
            return currentUser?.hasRoutes?.includes(curRoute.name);
        }
        return false;
      },
      canCustomFoo: (cusParams:any) => {
        if(cusParams){
            return cusParams.owerId===currentUser?.userid;
        }
        return false;
      },
    };
  }
  