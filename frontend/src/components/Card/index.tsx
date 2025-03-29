import { useState } from 'react';

import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Card as CardAnt, Modal } from 'antd';
import { useDeleteRing } from '../../api/useDeleteRing.api';
import ring from '../../assets/ring.webp';
import ring2 from '../../assets/ring2.webp';
import ring3 from '../../assets/ring3.webp';
import ring4 from '../../assets/ring4.jpeg';
import ring5 from '../../assets/ring5.jpeg';
import ring6 from '../../assets/ring6.jpg';
import { EBearer, EBearerDict } from '../../utils/enuns/e-bearer';
import EditRingModal from '../EditRingModal';
import './styles.css';

interface Props {
  id: number;
  name: string;
  power: string;
  bearer: EBearer;
  forged: string;
}

export default function Card({ id, name, power, forged, bearer }: Props) {
  const [modal, contextHolder] = Modal.useModal();
  const [isEditRingModalVisible, setIsEditRingModalVisible] = useState(false);

  const { mutate: deleteRing, isPending } = useDeleteRing();

  function handleDelete() {
    deleteRing(id);
  }

  function confirmDelete() {
    modal.confirm({
      onOk: handleDelete,
      okText: 'Deletar',
      cancelText: 'Cancelar',
      title: `Deletar ${name}`,
      content: 'Você tem certeza que deseja deletar este anel?',
      okButtonProps: { className: 'delete-button', loading: isPending },
    });
  }

  const images = [ring, ring2, ring3, ring4, ring5, ring6];

  const imagem = images[Math.floor(Math.random() * images.length)];

  return (
    <CardAnt
      className="card-content"
      cover={<img alt="example" src={imagem} className="card-image" />}
      actions={[
        <EditOutlined
          key="edit"
          onClick={() => setIsEditRingModalVisible(true)}
        />,
        <DeleteOutlined
          key="delete"
          style={{ color: '#e74c3c' }}
          onClick={confirmDelete}
        />,
      ]}
    >
      <div className="details">
        <h2>{name}</h2>
        <p>
          <strong>Poder:</strong> {power}
        </p>
        <p>
          <strong>Portador:</strong> {EBearerDict[bearer]}
        </p>
        <p>
          <strong>Forjador por:</strong> {forged}
        </p>
      </div>

      {contextHolder}

      {isEditRingModalVisible && (
        <EditRingModal
          open={isEditRingModalVisible}
          onClose={() => setIsEditRingModalVisible(false)}
          ringId={id}
        />
      )}
    </CardAnt>
  );
}
