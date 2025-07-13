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

const DeathCertificate_Comp = () => {
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
        collection(firestore, "deathCertificates"),
        where("userId", "==", currentUser.uid)
      );
    } else {
      // Fetch all forms for admin and staff
      q = collection(firestore, "deathCertificates");
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
        formName: "Death Certificate",
      };

      const formData = {
        ...data,
        ...defaultData,
        status: "pending",
        userId: currentUser.uid, // Add userId to the form data
      };

      if (selectedForm) {
        await updateDoc(
          doc(firestore, "deathCertificates", selectedForm.id),
          defaultData,
          formData
        );
        alert("Form updated successfully!");
      } else {
        await addDoc(collection(firestore, "deathCertificates"), formData);
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
    setValue("Death", form.Death);
    setValue("Place", form.Place);
    setValue("TimeofDeath", form.TimeofDeath);
    setValue("Nationality", form.Nationality);
    setValue("CauseofDeath", form.CauseofDeath);
    setValue("TypeofDeath", form.TypeofDeath);
    setValue("FatherName", form.FatherName);
    setValue("MotherName", form.MotherName);
    setValue("consent", form.consent);
  };

  // deleting forms
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(firestore, "deathCertificates", id));
      alert("Form deleted successfully!");
      // Refresh the form list
      const querySnapshot = await getDocs(
        collection(firestore, "deathCertificates")
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
      await updateDoc(doc(firestore, "deathCertificates", id), { status });
      alert("Status updated successfully!");
      fetchForms(); // Refresh the form list
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Error updating status. Please try again.");
    }
  };

  return (
    // Death Certificate Application Form
    <div className="container">
      <h1 className="title">Death Certificate Application</h1>
      <form className="form" onSubmit={handleSubmit(handleCreateOrUpdate)}>
        <fieldset className="fieldset">
          <legend className="legend">Personal Details of the Deceased</legend>

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
            Date of Death:
            <input
              type="date"
              className="input"
              {...register("Death", {
                required: "Date of Death is required",
              })}
            />
            {errors.Death && (
              <p className="error-message">{errors.Death.message}</p>
            )}
          </label>
          <label className="label">
            Place of Death:
            <input
              type="text"
              className="input"
              {...register("Place", {
                required: "Place of Death is required",
              })}
            />
            {errors.Place && (
              <p className="error-message">{errors.Place.message}</p>
            )}
          </label>
          <label className="label">
            Age at Time of Death:
            <input
              type="number"
              className="input"
              {...register("TimeofDeath", {
                required: "Age at Time of Death is required",
              })}
            />
            {errors.TimeofDeath && (
              <p className="error-message">{errors.TimeofDeath.message}</p>
            )}
          </label>
          <label className="label">
            Nationality:
            <input
              type="text"
              className="input"
              {...register("Nationality", {
                required: "Age at Time of Death is required",
              })}
            />
            {errors.Nationality && (
              <p className="error-message">{errors.Nationality.message}</p>
            )}
          </label>

          <legend className="legend" style={{ fontSize: "20px" }}>
            Details of the Death
          </legend>
          <label className="label">
            Cause of Death:
            <input
              type="text"
              className="input"
              {...register("CauseofDeath", {
                required: "Cause of Death is required",
              })}
            />
            {errors.CauseofDeath && (
              <p className="error-message">{errors.CauseofDeath.message}</p>
            )}
          </label>
          <label className="label">
            Type of Death:
            <input
              type="text"
              className="input"
              {...register("TypeofDeath", {
                required: "Type of Death is required",
              })}
            />
            {errors.TypeofDeath && (
              <p className="error-message">{errors.TypeofDeath.message}</p>
            )}
          </label>
        </fieldset>

        <fieldset className="fieldset">
          <legend className="legend">
            Personal Details of the Deceased’s Parents (if applicable)
          </legend>
          <label className="label">
            Father’s Name:
            <input type="text" className="input" {...register("FatherName")} />
          </label>
          <label className="label">
            Mother’s Name:
            <input type="text" className="input" {...register("MotherName")} />
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
                  <legend className="legend" style={{ fontSize: "14px" }}>
                    Personal Details of the Deceased
                  </legend>
                  <strong>Form Name:</strong> {form.formName}
                  <br />
                  <strong>FullName: </strong> {form.FullName}
                  <br />
                  <strong>Gender: </strong> {form.Gender}
                  <br />
                  <strong>DOB : </strong> {form.childDOB}
                  <br />
                  <strong>Death : </strong> {form.Death}
                  <br />
                  <strong>Place: </strong> {form.Place}
                  <br />
                  <strong>Age at Time of Death: </strong> {form.TimeofDeath}
                  <br />
                  <strong>Nationality: </strong> {form.Nationality}
                  <br />
                  <strong>Cause of Death : </strong> {form.CauseofDeath}
                  <br />
                  <strong>Type of Death : </strong> {form.TypeofDeath}
                  <br />
                  <legend className="legend" style={{ fontSize: "14px" }}>
                    Personal Details of the Deceased’s Parents (if applicable)
                  </legend>
                  <strong>FatherName : </strong> {form.FatherName}
                  <br />
                  <strong>Mother Name : </strong> {form.MotherName}
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

export default DeathCertificate_Comp;
// _____  _  __
// / ____|| |/ /
// | (___  | ' /
//  \___ \ |  <
//  ____) || . \
// |_____/ |_|\_\

// 👨‍💻 web site Created by Amir Sohail Sheikh
