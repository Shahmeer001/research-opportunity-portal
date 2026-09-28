import { useState } from "react";

const EMPTY = {
    title: "",
    description: "",
    research_area: "",
    faculty_name: "",
    department: "",
    required_skills: "",
    available_positions: "",
    application_deadline: "",
    status: "Open",
};

function toFormValues(opp) {
    if (!opp) return EMPTY;
    return {
        title: opp.title,
        description: opp.description,
        research_area: opp.research_area,
        faculty_name: opp.faculty_name,
        department: opp.department,
        required_skills: opp.required_skills ?? "",
        available_positions: String(opp.available_positions),
        application_deadline: opp.application_deadline,
        status: opp.status,
    };
}

// Basic client-side validation for required fields
function validate(v) {
    const errors = [];
    const required = {
        title: "Title",
        description: "Description",
        research_area: "Research area",
        faculty_name: "Faculty member",
        department: "Department",
    };
    for (const [key, label] of Object.entries(required)) {
        if (!v[key].trim()) errors.push(`${label} is required.`);
    }
    const positions = Number(v.available_positions);
    if (!Number.isInteger(positions) || positions < 1) {
        errors.push("Positions must be a whole number of at least 1.");
    }
    if (!v.application_deadline || Number.isNaN(Date.parse(v.application_deadline))) {
        errors.push("A valid application deadline is required.");
    }
    return errors;
}

export default function OpportunityForm({ initial, onSubmit, onClose }) {
    const [values, setValues] = useState(toFormValues(initial));
    const [errors, setErrors] = useState([]);
    const [saving, setSaving] = useState(false);

    const change = (e) => setValues({ ...values, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const problems = validate(values);
        if (problems.length) {
            setErrors(problems);
            return;
        }
        setErrors([]);
        setSaving(true);
        try {
            await onSubmit({
                title: values.title.trim(),
                description: values.description.trim(),
                research_area: values.research_area.trim(),
                faculty_name: values.faculty_name.trim(),
                department: values.department.trim(),
                required_skills: values.required_skills.trim() || null,
                available_positions: Number(values.available_positions),
                application_deadline: values.application_deadline,
                status: values.status,
            });
        } catch (err) {
            setErrors(
                err.errors?.length
                    ? err.errors.map((x) => `${x.field}: ${x.message}`)
                    : [err.message]
            );
            setSaving(false);
        }
    };

    const field = (name, label, props = {}) => (
        <div className="mb-3">
            <label className="form-label" htmlFor={name}>{label}</label>
            <input
                className="form-control"
                id={name}
                name={name}
                value={values[name]}
                onChange={change}
                {...props}
            />
        </div>
    );

    return (
        <>
            <div className="modal d-block" tabIndex="-1" style={{ overflowY: "auto" }}>
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <form onSubmit={handleSubmit} noValidate>
                            <div className="modal-header">
                                <h5 className="modal-title">
                                    {initial ? "Edit Opportunity" : "New Opportunity"}
                                </h5>
                                <button type="button" className="btn-close" onClick={onClose} />
                            </div>

                            <div className="modal-body">
                                {errors.length > 0 && (
                                    <div className="alert alert-danger">
                                        <ul className="mb-0">
                                            {errors.map((m, i) => (
                                                <li key={i}>{m}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {field("title", "Title *", { maxLength: 255 })}

                                <div className="mb-3">
                                    <label className="form-label" htmlFor="description">
                                        Description *
                                    </label>
                                    <textarea
                                        className="form-control"
                                        id="description"
                                        name="description"
                                        rows="3"
                                        value={values.description}
                                        onChange={change}
                                    />
                                </div>

                                <div className="row">
                                    <div className="col-md-6">
                                        {field("research_area", "Research area *", { maxLength: 100 })}
                                    </div>
                                    <div className="col-md-6">
                                        {field("faculty_name", "Faculty member *", { maxLength: 100 })}
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6">
                                        {field("department", "Department *", { maxLength: 100 })}
                                    </div>
                                    <div className="col-md-6">
                                        {field("required_skills", "Required skills", { maxLength: 255 })}
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-4">
                                        {field("available_positions", "Positions *", {
                                            type: "number",
                                            min: 1,
                                        })}
                                    </div>
                                    <div className="col-md-4">
                                        {field("application_deadline", "Deadline *", { type: "date" })}
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <label className="form-label" htmlFor="status">Status</label>
                                        <select
                                            className="form-select"
                                            id="status"
                                            name="status"
                                            value={values.status}
                                            onChange={change}
                                        >
                                            <option>Open</option>
                                            <option>Closed</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={onClose}>
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary" disabled={saving}>
                                    {saving ? "Saving..." : "Save"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="modal-backdrop show" />
        </>
    );
}