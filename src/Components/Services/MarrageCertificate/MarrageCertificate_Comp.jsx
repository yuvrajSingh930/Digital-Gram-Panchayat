// all hooks
import React, { useState, useEffect, useCallback } from "react";

// all libraries
import { useForm } from "react-hook-form";

// all firebase
import { firestore, auth } from "../../FireasbeConfig";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  getDoc,
  doc,
  query,
  where,
} from "firebase/firestore";

// css
import "../BirthCertificate/Birth.css";

const MarriageCertificate_Comp = () => {
  // all state
  const [forms, setForms] = useState([]);
  const [selectedForm, setSelectedForm] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isStaff, setIsStaff] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // form validation
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  // Fetch forms based on user role
  const fetchForms = useCallback(async () => {
    if (!currentUser) return;

    let q;

    if (isUser) {
      // Filter forms by userId if the current user is a regular user
      q = query(
        collection(firestore, "marriageCertificates"),
        where("userId", "==", currentUser.uid)
      );
    } else {
      // Fetch all forms for admin and staff
      q = collection(firestore, "marriageCertificates");
    }

    try {
      const querySnapshot = await getDocs(q);
      const formsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setForms(formsData);
    } catch (error) {
      console.error("Error fetching forms:", error);
    }
  }, [isUser, currentUser]);

  // checking role
  useEffect(() => {
    const checkRole = async (user) => {
      if (user) {
        setCurrentUser(user);

        // Check user role in Firestore
        const [adminDocSnap, staffDocSnap, userDocSnap] = await Promise.all([
          getDoc(doc(firestore, "Adminuser", user.uid)),
          getDoc(doc(firestore, "Staffuser", user.uid)),
          getDoc(doc(firestore, "User", user.uid)),
        ]);

        if (adminDocSnap.exists() && adminDocSnap.data().role === "admin") {
          setIsAdmin(true);
        } else if (
          staffDocSnap.exists() &&
          staffDocSnap.data().role === "staff"
        ) {
          setIsStaff(true);
        } else if (userDocSnap.exists() && userDocSnap.data().role === "user") {
          setIsUser(true);
        } else {
          console.log("User role is not recognized");
        }
      } else {
        console.log("User is not authenticated");
      }
    };

    const unsubscribe = onAuthStateChanged(auth, checkRole);

    return () => unsubscribe();
  }, [auth]);

  useEffect(() => {
    fetchForms();
  }, [fetchForms]);

  // creating or updating forms

  const handleCreateOrUpdate = async (data) => {
    try {
      if (!currentUser) {
        alert("User not authenticated. Please log in.");
        return;
      }

      // Include default data here
      const defaultData = {
        formName: "Marriage Certificate",
      };

      const formData = {
        ...data,
        ...defaultData,
        status: "pending",
        userId: currentUser.uid, // Add userId to the form data
      };

      if (selectedForm) {
        await updateDoc(
          doc(firestore, "marriageCertificates", selectedForm.id),
          defaultData,
          formData
        );
        alert("Form updated successfully!");
      } else {
        await addDoc(collection(firestore, "marriageCertificates"), formData);
        alert("Form submitted successfully!");
      }

      reset();
      setSelectedForm(null);

      // Refresh the form list
      fetchForms(); // Fetch forms again to update the list
    } catch (error) {
      console.error("Error saving form:", error);
      alert("Error saving form. Please try again.");
    }
  };

  // getting the form value to edit

  const handleEdit = (form) => {
    setSelectedForm(form);
    setValue("FullName", form.FullName);
    setValue("childDOB", form.childDOB);
    setValue("Gender", form.Gender);
    setValue("Nationality", form.Nationality);
    setValue("Address", form.Address);
    setValue("Contact", form.Contact);

    setValue("FullName1", form.FullName1);
    setValue("childDOB1", form.childDOB1);
    setValue("Gender1", form.Gender1);
    setValue("Nationality1", form.Nationality1);
    setValue("Address1", form.Address1);
    setValue("Contact1", form.Contact1);
    setValue("Date", form.Date);
    setValue("Place", form.Place);
    setValue("Type", form.Type);
  };

  // deleting forms
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(firestore, "marriageCertificates", id));
      alert("Form deleted successfully!");
      // Refresh the form list
      const querySnapshot = await getDocs(
        collection(firestore, "marriageCertificates")
      );
      setForms(
        querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
    } catch (error) {
      console.error("Error deleting form:", error);
      alert("Error deleting form. Please try again.");
    }
  };

  // updating status

  const handleStatusChange = async (id, status) => {
    try {
      await updateDoc(doc(firestore, "marriageCertificates", id), { status });
      alert("Status updated successfully!");
      fetchForms(); // Refresh the form list
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Error updating status. Please try again.");
    }
  };
  return (
    // Marriage Certificate Application Form
    <div className="container">
      <h1 className="title">Marriage Certificate Application</h1>
      <form className="form" onSubmit={handleSubmit(handleCreateOrUpdate)}>
        <fieldset className="fieldset">
          <legend className="legend">
            Personal Information of Applicantss
          </legend>
          <legend className="legend" style={{ fontSize: "14px" }}>
            Applicant 1
          </legend>
          <label className="label">
            Full Name:
            <input
              type="text"
              className="input"
              {...register("FullName", { required: "FullName is required" })}
            />
            {errors.FullName && (
              <p className="error-message">{errors.FullName.message}</p>
            )}
          </label>
          <label className="label">
            Date of Birth:
            <input
              type="date"
              className="input"
              {...register("childDOB", {
                required: "Date of birth is required",
              })}
            />
            {errors.childDOB && (
              <p className="error-message">{errors.childDOB.message}</p>
            )}
          </label>
          <label className="label">
            Gender:
            <input
              type="text"
              className="input"
              {...register("Gender", {
                required: "Gender is required",
              })}
            />
            {errors.Gender && (
              <p className="error-message">{errors.Gender.message}</p>
            )}
          </label>
          <label className="label">
            Nationality:
            <input
              type="text"
              className="input"
              {...register("Nationality", {
                required: "Nationality is required",
              })}
            />
            {errors.Nationality && (
              <p className="error-message">{errors.Nationality.message}</p>
            )}
          </label>
          <label className="label">
            Address:
            <input
              type="text"
              className="input"
              {...register("Address", {
                required: "Address is required",
              })}
            />
            {errors.Address && (
              <p className="error-message">{errors.Address.message}</p>
            )}
          </label>
          <label className="label">
            Contact Information (Phone, Email):
            <input
              type="text"
              className="input"
              {...register("Contact", {
                required: "Contact Information is required",
              })}
            />
            {errors.Contact && (
              <p className="error-message">{errors.Contact.message}</p>
            )}
          </label>

          <legend className="legend" style={{ fontSize: "14px" }}>
            Applicant 2
          </legend>
          <label className="label">
            Full Name:
            <input
              type="text"
              className="input"
              {...register("FullName1", { required: "FullName is required" })}
            />
            {errors.FullName1 && (
              <p className="error-message">{errors.FullName1.message}</p>
            )}
          </label>
          <label className="label">
            Date of Birth:
            <input
              type="date"
              className="input"
              {...register("childDOB1", {
                required: "Date of birth is required",
              })}
            />
            {errors.childDOB1 && (
              <p className="error-message">{errors.childDOB1.message}</p>
            )}
          </label>
          <label className="label">
            Gender:
            <input
              type="text"
              className="input"
              {...register("Gender1", {
                required: "Gender is required",
              })}
            />
            {errors.Gender1 && (
              <p className="error-message">{errors.Gender1.message}</p>
            )}
          </label>
          <label className="label">
            Nationality:
            <input
              type="text"
              className="input"
              {...register("Nationality1", {
                required: "Nationality is required",
              })}
            />
            {errors.Nationality1 && (
              <p className="error-message">{errors.Nationality1.message}</p>
            )}
          </label>
          <label className="label">
            Address:
            <input
              type="text"
              className="input"
              {...register("Address1", {
                required: "Address is required",
              })}
            />
            {errors.Address1 && (
              <p className="error-message">{errors.Address1.message}</p>
            )}
          </label>
          <label className="label">
            Contact Information (Phone, Email):
            <input
              type="text"
              className="input"
              {...register("Contact1", {
                required: "Contact Information is required",
              })}
            />
            {errors.Contact1 && (
              <p className="error-message">{errors.Contact1.message}</p>
            )}
          </label>
        </fieldset>

        <fieldset className="fieldset">
          <legend className="legend">Marriage Details</legend>
          <label className="label">
            Marriage Date:
            <input
              type="date"
              className="input"
              {...register("Date", {
                required: "Marriage Date is required",
              })}
            />
            {errors.Date && (
              <p className="error-message">{errors.Date.message}</p>
            )}
          </label>
          <label className="label">
            Marriage Place:
            <input
              type="text"
              className="input"
              {...register("Place", {
                required: "Marriage Place is required",
              })}
            />
            {errors.Place && (
              <p className="error-message">{errors.Place.message}</p>
            )}
          </label>
          <label className="label">
            Marriage Ceremony Type (e.g., religious, civil).
            <input
              type="text"
              className="input"
              {...register("Type", {
                required: "Marriage Ceremony Type is required",
              })}
            />
            {errors.Type && (
              <p className="error-message">{errors.Type.message}</p>
            )}
          </label>
          <label className="label">
            Officiant Details (e.g., Name and designation of the officiant if
            applicable).
            <input type="text" className="input" {...register("Details", {})} />
          </label>
        </fieldset>

        <fieldset className="fieldset">
          <legend className="legend">Consent and Declaration</legend>
          <label className="label">
            <input
              type="checkbox"
              className="checkbox"
              {...register("consent", { required: "Consent is required" })}
            />
            {errors.consent && (
              <p className="error-message">{errors.consent.message}</p>
            )}
            I confirm that the information provided is accurate and true.
          </label>
        </fieldset>

        <button type="submit" className="submit-button">
          {selectedForm ? "Update Form" : "Apply Form"}
        </button>
      </form>

      {/* Existing forms list for admin to edit delete or update status and for staff to only update the status*/}

      {isAdmin || isStaff ? (
        <>
          <h2 className="existing-forms-title">All Submitted Forms</h2>
          <ul className="form-list">
            {forms.map((form) => (
              <li key={form.id} className="form-item">
                <div className="form-details">
                  <strong>Form Name:</strong> {form.formName}
                  <br />
                  <legend className="legend" style={{ fontSize: "14px" }}>
                    Applicant 1
                  </legend>
                  <strong>FullName: </strong> {form.FullName}
                  <br />
                  <strong>Gender: </strong> {form.Gender}
                  <br />
                  <strong>Nationality: </strong> {form.Nationality}
                  <br />
                  <strong>Address: </strong> {form.Address}
                  <br />
                  <strong>Contacte: </strong> {form.Contact}
                  <br />
                  <legend className="legend" style={{ fontSize: "14px" }}>
                    Applicant 2
                  </legend>
                  <strong>FullName: </strong> {form.FullName1}
                  <br />
                  <strong>childDOB : </strong> {form.childDOB1}
                  <br />
                  <strong>Gender: </strong> {form.Gender1}
                  <br />
                  <strong>Nationality: </strong> {form.Nationality1}
                  <br />
                  <strong>Address: </strong> {form.Address1}
                  <br />
                  <strong>Contacte: </strong> {form.Contact1}
                  <br />
                  <legend className="legend" style={{ fontSize: "14px" }}>
                    marriage Details
                  </legend>
                  <strong>Date: </strong> {form.Date}
                  <br />
                  <strong>Place: </strong> {form.Place}
                  <br />
                  <strong>Type: </strong> {form.Type}
                  <br />
                  <strong>Details: </strong> {form.Details}
                  <br />
                  <strong>Consent:</strong> {form.consent ? "Yes" : "No"}
                  <br />
                  <strong>Status:</strong> {form.status} {/* Display status */}
                  <br />
                  <strong>Form ID:</strong> {form.id}
                  <br />
                </div>

                {/* Edit, Delete,  Approve, Reject buttons only for admin and Approve, Reject buttons for staff*/}

                {isAdmin ? (
                  <>
                    <button
                      onClick={() => handleEdit(form)}
                      className="edit-button"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(form.id)}
                      className="delete-button"
                    >
                      Delete
                    </button>

                    <button
                      onClick={() => handleStatusChange(form.id, "approved")}
                      className="status-button"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleStatusChange(form.id, "rejected")}
                      className="status-button"
                    >
                      Reject
                    </button>
                  </>
                ) : (
                  <>
                    {/* Approve, Reject buttons only for staff*/}
                    <button
                      onClick={() => handleStatusChange(form.id, "approved")}
                      className="status-button"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleStatusChange(form.id, "rejected")}
                      className="status-button"
                    >
                      Reject
                    </button>
                  </>
                )}
              </li>
            ))}
          </ul>
        </>
      ) : null}
    </div>
  );
};

export default MarriageCertificate_Comp;
// _____  _  __
// / ____|| |/ /
// | (___  | ' /
//  \___ \ |  <
//  ____) || . \
// |_____/ |_|\_\

// 👨‍💻 web site Created by Amir Sohail Sheikh
