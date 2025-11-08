const useValidation = form => {
  if (!form) {
    throw new Error('Form is required');
  }

  const { handleSubmit } = form;

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
