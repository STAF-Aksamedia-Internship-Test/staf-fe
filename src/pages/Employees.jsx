import { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import api, { getImageUrl, uploadImage } from '../api';
import UserIcon from '../components/UserIcon';
import PageHeader from '../components/PageHeader';
import Alert from '../components/Alert';
import SearchInput from '../components/SearchInput';
import Modal from '../components/Modal';
import Button from '../components/Button';
import FormField from '../components/FormField';
import SelectDropdown from '../components/SelectDropdown';
import { TableLoading } from '../components/LoadingSpinner';

const PlusIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
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

const UsersEmptyIcon = () => (
  <svg className="w-12 h-12 text-gray-300 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const CameraIcon = () => (
  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

export default function Employees() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [employees, setEmployees] = useState([]);
  const [divisions, setDivisions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    division_id: '',
    position: '',
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState({ id: null, name: '' });
  const [formErrors, setFormErrors] = useState({});

  const page = parseInt(searchParams.get('page') || '1');
  const search = searchParams.get('search') || '';
  const divisionId = searchParams.get('division_id') || '';
  const [searchInput, setSearchInput] = useState(search);

  const fetchEmployees = useCallback(async () => {
    setLoading(true);
    try {
      const currentPage = parseInt(searchParams.get('page') || '1');
      const currentSearch = searchParams.get('search') || '';
      const currentDivision = searchParams.get('division_id') || '';
      
      const response = await api.getEmployees({ page: currentPage, name: currentSearch, division_id: currentDivision });
      if (response.status === 'success') {
        setEmployees(response.data.employees);
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [searchParams]);

  const fetchDivisions = useCallback(async () => {
    try {
      const response = await api.getDivisions({ per_page: 100 });
      if (response.status === 'success') {
        setDivisions(response.data.divisions);
      }
    } catch (err) {
      console.error('Failed to fetch divisions:', err);
    }
  }, []);

  useEffect(() => {
    fetchEmployees();
    fetchDivisions();
  }, [fetchEmployees, fetchDivisions]);

  // Sync searchInput with URL search param on mount and when URL changes
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

  const handleDivisionFilter = (e) => {
    const value = e.target.value;
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set('division_id', value);
    } else {
      params.delete('division_id');
    }
    params.set('page', '1');
    setSearchParams(params);
  };

  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', newPage.toString());
    setSearchParams(params);
  };

  const handleOpenModal = (employee = null) => {
    if (employee) {
      setEditingEmployee(employee);
      setFormData({
        name: employee.name,
        phone: employee.phone,
        division_id: employee.division?.id || '',
        position: employee.position,
        image: null,
      });
      setImagePreview(employee.image);
    } else {
      setEditingEmployee(null);
      setFormData({
        name: '',
        phone: '',
        division_id: '',
        position: '',
        image: null,
      });
      setImagePreview(null);
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingEmployee(null);
    setFormData({
      name: '',
      phone: '',
      division_id: '',
      position: '',
      image: null,
    });
    setImagePreview(null);
    setFormErrors({});
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Nama lengkap wajib diisi';
    } else if (formData.name.trim().length < 2) {
      errors.name = 'Nama minimal harus 2 karakter';
    }
    
    if (!formData.phone.trim()) {
      errors.phone = 'Nomor telepon wajib diisi';
    } else if (!/^[0-9+\-\s]+$/.test(formData.phone.trim())) {
      errors.phone = 'Format nomor telepon tidak valid';
    }
    
    if (!formData.division_id) {
      errors.division_id = 'Divisi wajib dipilih';
    }
    
    if (!formData.position.trim()) {
      errors.position = 'Jabatan wajib diisi';
    } else if (formData.position.trim().length < 2) {
      errors.position = 'Jabatan minimal harus 2 karakter';
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
      // Upload image to Cloudinary first if there's a new image
      let imageUrl = formData.image;
      if (formData.image && typeof formData.image !== 'string') {
        imageUrl = await uploadImage(formData.image);
      }

      const form = new FormData();
      form.append('name', formData.name);
      form.append('phone', formData.phone);
      form.append('division', formData.division_id);
      form.append('position', formData.position);
      
      if (imageUrl) {
        // If Cloudinary URL, send as image_url; if local file, send as image
        if (imageUrl.startsWith('http')) {
          form.append('image_url', imageUrl);
        } else {
          form.append('image', formData.image);
        }
      }

      if (editingEmployee) {
        const response = await api.updateEmployee(editingEmployee.id, form);
        if (response.status === 'success') {
          setSuccess('Karyawan berhasil diperbarui');
          handleCloseModal();
          fetchEmployees();
        } else {
          setError(response.message);
        }
      } else {
        const response = await api.createEmployee(form);
        if (response.status === 'success') {
          setSuccess('Karyawan berhasil ditambahkan');
          handleCloseModal();
          fetchEmployees();
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
      const response = await api.deleteEmployee(id);
      if (response.status === 'success') {
        setSuccess('Karyawan berhasil dihapus');
        closeDeleteModal();
        fetchEmployees();
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Data Karyawan"
        description="Kelola seluruh data karyawan organisasi"
        backButton
        onBack={() => navigate('/')}
        actions={
          <Button onClick={() => handleOpenModal()} icon={PlusIcon}>
            Tambah Karyawan
          </Button>
        }
      />

      {error && <Alert type="error" onDismiss={() => setError('')}>{error}</Alert>}
      {success && <Alert type="success" onDismiss={() => setSuccess('')}>{success}</Alert>}

      <div className="flex flex-col sm:flex-row gap-4">
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
          placeholder="Cari karyawan..."
          className="flex-1"
        />
        <SelectDropdown
          value={divisionId}
          onChange={handleDivisionFilter}
          options={[
            { value: '', label: 'Semua Divisi' },
            ...divisions.map(d => ({ value: d.id, label: d.name }))
          ]}
          placeholder="Semua Divisi"
          className="w-full sm:w-48"
        />
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-900/50">
              <tr>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Foto
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Nama
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Telepon
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Divisi
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Jabatan
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {loading ? (
                <TableLoading columns={6} />
              ) : employees.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <UsersEmptyIcon />
                      <span className="text-gray-500 dark:text-gray-400">Tidak ada data karyawan</span>
                    </div>
                  </td>
                </tr>
              ) : (
                employees.map((employee) => (
                  <tr key={employee.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="w-12 h-12 rounded-xl overflow-hidden bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 flex items-center justify-center mx-auto text-gray-400 dark:text-gray-500">
                        {employee.image ? (
                          <img src={employee.image} alt={employee.name} className="w-full h-full object-cover" />
                        ) : (
                          <UserIcon className="w-8 h-8" />
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{employee.name}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 text-center">
                      {employee.phone}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300">
                        {employee.division?.name || '-'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 text-center">
                      {employee.position}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-center space-x-2">
                      <Button variant="ghost" size="sm" onClick={() => handleOpenModal(employee)} icon={EditIcon}>
                        Edit
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => openDeleteModal(employee.id, employee.name)} icon={DeleteIcon} className="text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30">
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
              <Button variant="secondary" size="sm" onClick={() => handlePageChange(page - 1)} disabled={page <= 1}>
                Previous
              </Button>
              <Button variant="secondary" size="sm" onClick={() => handlePageChange(page + 1)}>
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        title={editingEmployee ? 'Edit Karyawan' : 'Tambah Karyawan Baru'}
        size="lg"
        footer={
          <>
            <Button variant="secondary" onClick={handleCloseModal}>
              Batal
            </Button>
            <Button onClick={handleSubmit} loading={submitting}>
              {editingEmployee ? 'Simpan Perubahan' : 'Tambah Karyawan'}
            </Button>
          </>
        }
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-24 h-24 rounded-2xl overflow-hidden bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 flex items-center justify-center">
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <UserIcon className="w-16 h-16 text-gray-400 dark:text-gray-500" />
                )}
              </div>
              <label
                htmlFor="image"
                className="absolute -bottom-2 -right-2 w-10 h-10 bg-indigo-600 hover:bg-indigo-700 rounded-xl flex items-center justify-center cursor-pointer shadow-lg hover:scale-110 transition-transform duration-200"
              >
                <CameraIcon />
                <input
                  type="file"
                  id="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          <FormField label="Nama Lengkap" required error={formErrors.name}>
            <input
              type="text"
              id="name"
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
              placeholder="Masukkan nama lengkap"
            />
          </FormField>

          <FormField label="No Telepon" required error={formErrors.phone}>
            <input
              type="text"
              id="phone"
              value={formData.phone}
              onChange={(e) => {
                setFormData({ ...formData, phone: e.target.value });
                if (formErrors.phone) setFormErrors({ ...formErrors, phone: null });
              }}
              className={`w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border rounded-xl focus:ring-2 focus:ring-indigo-500/50 transition-all duration-200 ${
                formErrors.phone 
                  ? 'border-red-500 dark:border-red-500 focus:ring-red-500/50' 
                  : 'border-gray-200 dark:border-gray-700'
              }`}
              placeholder="Masukkan no telepon"
            />
          </FormField>

          <FormField label="Divisi" required error={formErrors.division_id}>
            <SelectDropdown
              value={formData.division_id}
              onChange={(e) => {
                setFormData({ ...formData, division_id: e.target.value });
                if (formErrors.division_id) setFormErrors({ ...formErrors, division_id: null });
              }}
              options={[
                { value: '', label: 'Pilih Divisi' },
                ...divisions.map(d => ({ value: d.id, label: d.name }))
              ]}
              placeholder="Pilih Divisi"
            />
          </FormField>

          <FormField label="Jabatan" required error={formErrors.position}>
            <input
              type="text"
              id="position"
              value={formData.position}
              onChange={(e) => {
                setFormData({ ...formData, position: e.target.value });
                if (formErrors.position) setFormErrors({ ...formErrors, position: null });
              }}
              className={`w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border rounded-xl focus:ring-2 focus:ring-indigo-500/50 transition-all duration-200 ${
                formErrors.position 
                  ? 'border-red-500 dark:border-red-500 focus:ring-red-500/50' 
                  : 'border-gray-200 dark:border-gray-700'
              }`}
              placeholder="Masukkan jabatan"
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
        <p>Apakah Anda yakin ingin menghapus karyawan <strong>{deleteTarget.name}</strong>?</p>
      </Modal>
    </div>
  );
}
