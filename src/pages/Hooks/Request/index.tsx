import React from 'react';
import useRequest from '@/components/useHooks/useRequest';
const RequestPage = (props: any) => {
  let [users, loadMore, loading] = useRequest(
    'http://localhost:3000/api/users',
  );
  console.log('users', users);
  if (loading) {
    return <div>正在加载下一页....</div>;
  }
  return (
    <div>
      {/* {loading && <div>正在加载下一页....</div>} */}
      <ul>
        {users &&
          users.map((item: any, index: number) => (
            <li key={item.id}>
              {item.id}:{item.name}
            </li>
          ))}
      </ul>
      <button onClick={loadMore}>加载更多</button>
    </div>
  );
};

export default RequestPage;
