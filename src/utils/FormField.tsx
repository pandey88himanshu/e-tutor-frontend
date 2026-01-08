const FormField = ({ label, error, children }) => {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="body-sm-500 text-[rgb(var(--gray-900))]">
          {label}
        </label>
      )}
      {children}
      {error && (
        <p className="text-[rgb(var(--error-500))] body-xs-400 mt-1">{error}</p>
      )}
    </div>
  );
};

export default FormField;
