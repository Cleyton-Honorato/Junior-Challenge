import { useState } from 'react';

import { PlusOutlined } from '@ant-design/icons';
import { Button, Empty, Spin, Tooltip } from 'antd';
import './App.css';
import { useGetRings } from './api/useGetRings.api';
import CreateRingModal from './components/CreateRingModal';
import Header from './components/Header';
import CardSlider from './components/Slide';

function App() {
  const [isCreateRingModalVisible, setIsCreateRingModalVisible] =
    useState(false);

  const { data, isFetching } = useGetRings();

  return (
    <>
      <Header />
      <Spin spinning={isFetching}>
        <main>
          <section className="intro">
            <strong>
              O grande mago J.R.R. Tolkien nos deixou a famosa frase:
            </strong>
            <i>
              Three Rings for the Elven-kings under the sky, Seven for the
              Dwarf-lords in their halls of stone, Nine for Mortal Men doomed to
              die, One for the Dark Lord on his dark throne In the Land of
              Mordor where the Shadows lie. One Ring to rule them all, One Ring
              to find them, One Ring to bring them all, and in the darkness bind
              them In the Land of Mordor where the Shadows lie.
            </i>
          </section>

          <section className="content">
            <div className="content-header">
              <strong>Anéis</strong>
              <Tooltip title="Criar Anel">
                <Button
                  className="add-ring-button"
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={() => setIsCreateRingModalVisible(true)}
                />
              </Tooltip>
            </div>
            {data?.length ? (
              <CardSlider rings={data} />
            ) : (
              <Empty description={false} />
            )}
          </section>
        </main>
      </Spin>

      {isCreateRingModalVisible && (
        <CreateRingModal
          open={isCreateRingModalVisible}
          onClose={() => setIsCreateRingModalVisible(false)}
        />
      )}
    </>
  );
}

export default App;
