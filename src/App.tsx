import './App.css';
import 'antd/dist/reset.css';

import dayjs from 'dayjs';

import type { Product } from './types/product';

import { useEffect, useMemo, useRef, useState } from 'react';
import { FaTrashAlt, FaPencilAlt, FaExchangeAlt } from "react-icons/fa";

import { apiGetAllProducts } from './services/apiGetAllProducts';
import { apiUpdateProduct } from './services/apiUpdateProduct';
import { apiDeleteProduct } from './services/apiDeleteProduct';
import { apiAddProduct } from './services/apiAddProduct';

import ButtonAddNewProduct from './components/Buttons/ButtonAddNewProduct';

import { Layout, Table, Button, Modal, Form, message, Typography, Space } from 'antd';
import FormProduct from './components/Form/FormProduct';

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const hasFetched = useRef(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const [form] = Form.useForm();

  const { Title } = Typography;
  const { Text } = Typography;

  useEffect(() => {
    if (hasFetched.current) return;

    hasFetched.current = true;

    const loadProducts = async () => {
      try {
        const response = await apiGetAllProducts();

        setProducts(response.data);

      } catch (error) {
          console.error("Erro na busca:", error);
      }
    }

    loadProducts();
  }, []);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Nome',
      dataIndex: 'nome',
      key: 'nome',
      ellipsis: true
    },
    {
      title: 'Quantidade',
      dataIndex: 'quantidade',
      key: 'quantidade',
      render: (value: number) => new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2, }).format(value)
    },
    {
      title: 'Localização',
      dataIndex: 'endereco',
      key: 'endereco',
      ellipsis: true
    },
    {
      title: 'Armazém',
      dataIndex: 'armazem',
      key: 'armazem',
      ellipsis: true
    },
    {
      title: 'Validade',
      dataIndex: 'validade',
      key: 'validade',
      render: (value: string | null) => value ? new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', }).format(new Date(value)) : '-'
    },
    {
      title: 'Lote',
      dataIndex: 'lote',
      key: 'lote',
      ellipsis: true
    },
    {
      title: 'Ações',
      key: 'actions',
      render: (unusedParam: null, product: Product) => (
        <>
          <Space size="small">
            <Button type="primary" onClick={() => handleEdit(product)}>
              <FaPencilAlt />
            </Button>

            <Button type="primary" danger onClick={() => handleDelete(product)}>
              <FaTrashAlt />
            </Button>
          </Space>
        </>
      ),
    },
  ];

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);

    form.setFieldsValue({...product, validade: product.validade ? dayjs(product.validade) : null, });
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();

      if (isCreating) {
        const nextId = products.length > 0 ? Math.max(...products.map(p => parseInt(p.id))) + 1 : 1;

        const newProduct: Product = {
          id: nextId,
          ...values,
          validade: values.validade ? values.validade.format('YYYY-MM-DD') : null,
        };

        const response = await apiAddProduct(newProduct);

        setProducts(prev => [...prev, response.data]);
        message.success('Produto criado com sucesso!');

      } else if (editingProduct) {
        const updatedProduct: Product = {
          ...editingProduct,
          ...values,
          validade: values.validade ? values.validade.format('YYYY-MM-DD') : null,
        };

        const response = await apiUpdateProduct(editingProduct.id, updatedProduct);

        setProducts(prev =>
          prev.map(p => (p.id === editingProduct.id ? response.data : p))
        );

        message.success('Produto atualizado com sucesso!');
      }

      setIsModalOpen(false);
      setIsCreating(false);
      setEditingProduct(null);
 
    } catch (error) {
      console.error('Erro ao salvar produto:', error);
      message.error('Erro ao salvar produto');
    }
  };

  const handleDelete = async (product: Product) => {
    try {
      await apiDeleteProduct(product.id);

      setProducts(prev => prev.filter(p => p.id !== product.id));

      message.success('Produto deletado com sucesso!');
    } catch (error) {
      console.error('Erro ao deletar produto:', error);
      message.error('Erro ao deletar o produto');
    }
  }

  const handleCreate = () => {
    setEditingProduct(null);
    setIsCreating(true);
    setIsModalOpen(true);

    form.resetFields();
  };

  const isMobile = useMemo(() => window.innerWidth < 1024, []);

  return (
    <>
      <Layout style={{ minHeight: '100dvh' }}>
        <div style={{ padding: '20px', maxWidth: 1200, margin: '0 auto', width: '100%' }}>
          <Title level={1}>Listagem de produtos</Title>

          <ButtonAddNewProduct
            onCreate={handleCreate}
          />

          {isMobile && (
            <Space align="center" size={6} style={{ color: "var(--ant-color-text)", marginBottom: "15px" }}>
              <FaExchangeAlt />
              
              <Text type="secondary" style={{ color: "var(--ant-color-text)" }}>Deslize para ver mais opções</Text>
            </Space>
          )}

          <Table
            dataSource={products}
            columns={columns}
            rowKey="id"
            bordered
            scroll={{ x: true }}
          />

          <Modal
            title={isCreating ? "Novo Produto" : "Editar Produto"}
            open={isModalOpen}
            onOk={handleSave}
            onCancel={() => {
              setIsModalOpen(false);
              setIsCreating(false);
              setEditingProduct(null);
            }}
            okText={isCreating ? "Criar" : "Salvar"}
            centered
          >
            <FormProduct
              form={form}
            />
          </Modal>
        </div>
      </Layout>
    </>
  )
}

export default App
