import { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import api from '../api';
import PageHeader from '../components/PageHeader';
import Alert from '../components/Alert';
import SearchInput from '../components/SearchInput';
import Modal from '../components/Modal';
import Button from '../components/Button';
import FormField from '../components/FormField';
import { TableLoading } from '../components/LoadingSpinner';

const PlusIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
  </svg>
);

const BuildingIcon = () => (
  <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M168,116h48a20.02229,20.02229,0,0,0,20-20V48a20.02229,20.02229,0,0,0-20-20H168a20.02229,20.02229,0,0,0-20,20V60h-4a36.04061,36.04061,0,0,0-36,36v20H92v-8A20.02229,20.02229,0,0,0,72,88H32a20.02229,20.02229,0,0,0-20,20v40a20.02229,20.02229,0,0,0,20,20H72a20.02229,20.02229,0,0,0,20-20v-8h16v20a36.04061,36.04061,0,0,0,36,36h4v12a20.02229,20.02229,0,0,0,20,20h48a20.02229,20.02229,0,0,0,20-20V160a20.02229,20.02229,0,0,0-20-20H168a20.02229,20.02229,0,0,0-20,20v12h-4a12.01343,12.01343,0,0,1-12-12V96a12.01343,12.01343,0,0,1,12-12h4V96A20.02229,20.02229,0,0,0,168,116ZM68,144H36V112H68Zm104,20h40v40H172Zm0-112h40V92H172Z" fill="currentColor"/>
  </svg>
);

const EditIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
);

const DeleteIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const BuildingEmptyIcon = () => (
  <svg className="w-12 h-12 text-gray-300 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);

export default function Divisions() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [divisions, setDivisions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingDivision, setEditingDivision] = useState(null);
  const [formData, setFormData] = useState({ name: '' });
  const [submitting, setSubmitting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState({ id: null, name: '' });
  const [formErrors, setFormErrors] = useState({});

  const page = parseInt(searchParams.get('page') || '1');
  const search = searchParams.get('search') || '';
  const [searchInput, setSearchInput] = useState(search);

  const fetchDivisions = useCallback(async () => {
    setLoading(true);
    try {
      const currentPage = parseInt(searchParams.get('page') || '1');
      const currentSearch = searchParams.get('search') || '';
      
      const response = await api.getDivisions({ page: currentPage, name: currentSearch });
      if (response.status === 'success') {
        setDivisions(response.data.divisions);
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [searchParams]);

  useEffect(() => {
    fetchDivisions();
  }, [fetchDivisions]);

  useEffect(() => {
    setSearchInput(search);
  }, [search]);

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (searchInput) {
      params.set('search', searchInput);
    } else {
      params.delete('search');
    }
    params.set('page', '1');
    setSearchParams(params);
  };

  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', newPage.toString());
    setSearchParams(params);
  };

  const handleOpenModal = (division = null) => {
    if (division) {
      setEditingDivision(division);
      setFormData({ name: division.name });
    } else {
      setEditingDivision(null);
      setFormData({ name: '' });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingDivision(null);
    setFormData({ name: '' });
    setFormErrors({});
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Nama divisi wajib diisi';
    } else if (formData.name.trim().length < 2) {
      errors.name = 'Nama divisi minimal harus 2 karakter';
    } else if (formData.name.trim().length > 100) {
      errors.name = 'Nama divisi maksimal 100 karakter';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!validateForm()) {
      return;
    }
    
    setSubmitting(true);

    try {
      const form = new FormData();
      form.append('name', formData.name);

      if (editingDivision) {
        const response = await api.updateDivision(editingDivision.id, form);
        if (response.status === 'success') {
          setSuccess('Divisi berhasil diperbarui');
          handleCloseModal();
          fetchDivisions();
        } else {
          setError(response.message);
        }
      } else {
        const response = await api.createDivision(form);
        if (response.status === 'success') {
          setSuccess('Divisi berhasil ditambahkan');
          handleCloseModal();
          fetchDivisions();
        } else {
          setError(response.message);
        }
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const openDeleteModal = (id, name) => {
    setDeleteTarget({ id, name });
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setDeleteTarget({ id: null, name: '' });
  };

  const performDelete = async () => {
    const id = deleteTarget.id;
    if (!id) return;
    try {
      const response = await api.deleteDivision(id);
      if (response.status === 'success') {
        setSuccess('Divisi berhasil dihapus');
        closeDeleteModal();
        fetchDivisions();
      } else {
        setError(response.message || 'Gagal menghapus divisi');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Data Divisi"
        description="Kelola seluruh data divisi organisasi"
        backButton
        onBack={() => navigate('/')}
        actions={
          <Button onClick={() => handleOpenModal()} icon={PlusIcon}>
            Tambah Divisi
          </Button>
        }
      />

      {error && <Alert type="error" onDismiss={() => setError('')}>{error}</Alert>}
      {success && <Alert type="success" onDismiss={() => setSuccess('')}>{success}</Alert>}

      <SearchInput
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        onSubmit={handleSearch}
        onClear={() => {
          const params = new URLSearchParams(searchParams);
          params.delete('search');
          params.set('page', '1');
          setSearchParams(params);
          setSearchInput('');
        }}
        placeholder="Cari divisi..."
      />

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-900/50">
              <tr>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  #
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Nama Divisi
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {loading ? (
                <TableLoading columns={3} />
              ) : divisions.length === 0 ? (
                <tr>
                  <td colSpan="3" className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <BuildingEmptyIcon />
                      <span className="text-gray-500 dark:text-gray-400">Tidak ada data divisi</span>
                    </div>
                  </td>
                </tr>
              ) : (
                divisions.map((division, index) => (
                  <tr key={division.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {(page - 1) * 10 + index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 flex items-center justify-center">
                          <BuildingIcon />
                        </div>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">{division.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2 justify-end flex">
                      <Button variant="ghost" size="sm" onClick={() => handleOpenModal(division)} icon={EditIcon}>
                        Edit
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => openDeleteModal(division.id, division.name)} icon={DeleteIcon} className="text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30">
                        Hapus
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Halaman <span className="font-medium text-gray-900 dark:text-white">{page}</span>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => handlePageChange(page - 1)}
                disabled={page <= 1}
              >
                Previous
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => handlePageChange(page + 1)}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        title={editingDivision ? 'Edit Divisi' : 'Tambah Divisi Baru'}
        footer={
          <>
            <Button variant="secondary" onClick={handleCloseModal}>
              Batal
            </Button>
            <Button onClick={handleSubmit} loading={submitting}>
              {editingDivision ? 'Simpan Perubahan' : 'Tambah Divisi'}
            </Button>
          </>
        }
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField label="Nama Divisi" required error={formErrors.name}>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value });
                if (formErrors.name) setFormErrors({ ...formErrors, name: null });
              }}
              className={`w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border rounded-xl focus:ring-2 focus:ring-indigo-500/50 transition-all duration-200 ${
                formErrors.name 
                  ? 'border-red-500 dark:border-red-500 focus:ring-red-500/50' 
                  : 'border-gray-200 dark:border-gray-700'
              }`}
              placeholder="Masukkan nama divisi"
              autoFocus
            />
          </FormField>
        </form>
      </Modal>

      <Modal
        isOpen={showDeleteModal}
        onClose={closeDeleteModal}
        title="Konfirmasi Hapus"
        size="sm"
        footer={
          <>
            <Button variant="secondary" onClick={closeDeleteModal}>
              Batal
            </Button>
            <Button onClick={performDelete} className="bg-red-600 hover:bg-red-700">
              Hapus
            </Button>
          </>
        }
      >
        <p>Apakah Anda yakin ingin menghapus divisi <strong>{deleteTarget.name}</strong>?</p>
      </Modal>
    </div>
  );
}
