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
import "./Birth.css";

const BirthCertificateManager = () => {
  // all state
  const [forms, setForms] = useState([]);
  const [selectedForm, setSelectedForm] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isStaff, setIsStaff] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({});

  // Fetch forms based on user role
  const fetchForms = useCallback(async () => {
    if (!currentUser) return;

    let q;

    if (isUser) {
      // Filter forms by userId if the current user is a regular user
      q = query(
        collection(firestore, "birthCertificates"),
        where("userId", "==", currentUser.uid)
      );
    } else {
      // Fetch all forms for admin and staff
      q = collection(firestore, "birthCertificates");
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

  const handleCreateOrUpdate = async (data) => {
    try {
      if (!currentUser) {
        alert("User not authenticated. Please log in.");
        return;
      }

      // Include default data here
      const defaultData = {
        formName: "Birth Certificate",
      };

      const formData = {
        ...data,
        ...defaultData,
        status: "pending",
        userId: currentUser.uid, // Add userId to the form data
      };

      if (selectedForm) {
        await updateDoc(
          doc(firestore, "birthCertificates", selectedForm.id),
          defaultData,
          formData
        );
        alert("Form updated successfully!");
      } else {
        await addDoc(collection(firestore, "birthCertificates"), formData);
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

  const handleEdit = (form) => {
    setSelectedForm(form);
    setValue("childName", form.childName);
    setValue("childDOB", form.childDOB);
    setValue("childBirthPlace", form.childBirthPlace);
    setValue("fatherName", form.fatherName);
    setValue("motherName", form.motherName);
    setValue("userId", form.userId);
    setValue("consent", form.consent);
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(firestore, "birthCertificates", id));
      alert("Form deleted successfully!");
      fetchForms(); // Refresh the form list
    } catch (error) {
      console.error("Error deleting form:", error);
      alert("Error deleting form. Please try again.");
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await updateDoc(doc(firestore, "birthCertificates", id), { status });
      alert("Status updated successfully!");
      fetchForms(); // Refresh the form list
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Error updating status. Please try again.");
    }
  };

  return (
    // Birth Certificate Application Form
    <div className="container">
      <h1 className="title">Birth Certificate Application</h1>
      <form className="form" onSubmit={handleSubmit(handleCreateOrUpdate)}>
        <fieldset className="fieldset">
          <legend className="legend">Child Details</legend>
          <label className="label">
            Child’s Full Name:
            <input
              type="text"
              className="input"
              {...register("childName", { required: "Child name is required" })}
            />
            {errors.childName && (
              <p className="error-message">{errors.childName.message}</p>
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
            Place of Birth:
            <input
              type="text"
              className="input"
              {...register("childBirthPlace", {
                required: "Place of birth is required",
              })}
            />
            {errors.childBirthPlace && (
              <p className="error-message">{errors.childBirthPlace.message}</p>
            )}
          </label>
        </fieldset>

        <fieldset className="fieldset">
          <legend className="legend">Parent/Guardian Details</legend>
          <label className="label">
            Father's Full Name:
            <input
              type="text"
              className="input"
              {...register("fatherName", {
                required: "Father's name is required",
              })}
            />
            {errors.fatherName && (
              <p className="error-message">{errors.fatherName.message}</p>
            )}
          </label>
          <label className="label">
            Mother's Full Name:
            <input
              type="text"
              className="input"
              {...register("motherName", {
                required: "Mother's name is required",
              })}
            />
            {errors.motherName && (
              <p className="error-message">{errors.motherName.message}</p>
            )}
          </label>
          <label className="label">
            Parent/Guardian Nationality:
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
            Parent/Guardian Contact information:
            <input
              type="text"
              className="input"
              {...register("Contact", {
                required: "Contact is required",
              })}
            />
            {errors.Contact && (
              <p className="error-message">{errors.Contact.message}</p>
            )}
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
                  <strong>Child Name:</strong> {form.childName}
                  <br />
                  <strong>Date of Birth:</strong> {form.childDOB}
                  <br />
                  <strong>Place of Birth:</strong> {form.childBirthPlace}
                  <br />
                  <strong>Father Name:</strong> {form.fatherName}
                  <br />
                  <strong>Mother Name:</strong> {form.motherName}
                  <br />
                  <strong>Consent:</strong> {form.consent}
                  <br />
                  <strong>Status:</strong> {form.status}
                  <br />
                  <strong>Form ID:</strong> {form.id}
                  <br />
                  <strong>User ID:</strong> {form.userId}
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

export default BirthCertificateManager;
// _____  _  __
// / ____|| |/ /
// | (___  | ' /
//  \___ \ |  <
//  ____) || . \
// |_____/ |_|\_\

// 👨‍💻 web site Created by Amir Sohail Sheikh
