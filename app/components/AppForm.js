import React from "react";
import { Formik } from "formik";

function AppForm({ initialValues, onSubmit, validationSchema, children }) {
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
        >
            {() => (
                // wrapped in brackets because functions should only return a single element/component but this has multiple elements/components functions should return a 'jsx' expression/fragment
                <>{children}</>
            )}
        </Formik>
    );
}

export default AppForm;
