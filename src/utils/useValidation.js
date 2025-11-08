const useValidation = form => {
  if (!form) {
    throw new Error('Form is required');
  }

  const {handleSubmit} = form;

  // Formun dışarıda ki bir fonksiyon ile submit edilmesi durumunu için oluşturuldu.
  const handleSubmitWithValidation = async onSubmit => {
    try {
      await handleSubmit(onSubmit)();
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  return {
    handleSubmitWithValidation,
  };
};

export default useValidation;
