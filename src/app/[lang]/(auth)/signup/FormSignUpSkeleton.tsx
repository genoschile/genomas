export function FormSignUpSkeleton() {
    return (
      <section className="auth-form">
        <div className="auth-form__container">
          <div style={styles.logo} />
  
          <form className="auth-form__form">
            <fieldset disabled>
              <legend className="auth-form__title" style={styles.skeletonText}>
                &nbsp;
              </legend>
  
              {[1, 2, 3].map((i) => (
                <div className="auth-form__input-group" key={i}>
                  <div style={styles.label} />
                  <div style={styles.input} />
                </div>
              ))}
  
              <div className="auth-form__button-container">
                <div style={styles.button} />
                <div style={styles.link} />
              </div>
            </fieldset>
          </form>
        </div>
      </section>
    );
  }
  
  const styles: { [key: string]: React.CSSProperties } = {
    logo: {
      width: 100,
      height: 100,
      borderRadius: '50%',
      backgroundColor: '#e0e0e0',
      margin: '0 auto 2rem',
    },
    skeletonText: {
      backgroundColor: '#e0e0e0',
      height: '2rem',
      width: '30%',
      margin: '0 auto 2rem',
      borderRadius: '4px',
    },
    label: {
      height: '1rem',
      width: '25%',
      backgroundColor: '#e0e0e0',
      marginBottom: '0.5rem',
      borderRadius: '4px',
    },
    input: {
      height: '2.5rem',
      backgroundColor: '#f0f0f0',
      borderRadius: '4px',
      marginBottom: '1.5rem',
    },
    button: {
      height: '2.5rem',
      backgroundColor: '#d0d0d0',
      borderRadius: '4px',
      width: '100%',
      marginBottom: '1rem',
    },
    link: {
      height: '1rem',
      width: '40%',
      backgroundColor: '#e0e0e0',
      borderRadius: '4px',
      margin: '0 auto',
    },
  };
  