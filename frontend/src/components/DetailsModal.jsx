import { useEffect } from "react";

export default function DetailsModal({ opportunity, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!opportunity) return null;

  const {
    title,
    description,
    research_area,
    faculty_name,
    department,
    required_skills,
    available_positions,
    application_deadline,
    status,
  } = opportunity;

  const isOpen = status === "Open";

  return (
    <>
      <div
        className="modal fade show d-block"
        tabIndex="-1"
        role="dialog"
        aria-modal="true"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            onClose();
          }
        }}
      >
        <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
          <div className="modal-content shadow border-0 rounded-3">
            <div className="modal-header border-bottom-0 pb-0">
              <div className="d-flex align-items-center gap-2">
                <span className="badge bg-primary-subtle text-primary border border-primary-subtle px-2 py-1">
                  {research_area}
                </span>
                <span
                  className={`badge ${
                    isOpen
                      ? "bg-success-subtle text-success border border-success-subtle"
                      : "bg-secondary-subtle text-secondary border border-secondary-subtle"
                  }`}
                >
                  {status}
                </span>
              </div>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={onClose}
              ></button>
            </div>

            <div className="modal-body pt-2">
              <h3 className="modal-title fw-bold text-dark mt-2 mb-1">{title}</h3>
              <p className="text-muted mb-3">
                <strong>Faculty:</strong> {faculty_name} &bull; <strong>Department:</strong> {department}
              </p>

              <div className="row g-3 bg-light p-3 rounded-3 mb-4">
                <div className="col-sm-6">
                  <span className="text-secondary small d-block">Available Positions</span>
                  <span className="fw-semibold text-dark fs-5">{available_positions}</span>
                </div>
                <div className="col-sm-6">
                  <span className="text-secondary small d-block">Application Deadline</span>
                  <span className="fw-semibold text-dark fs-5">{application_deadline}</span>
                </div>
              </div>

              <h6 className="fw-bold text-dark mb-2">Description</h6>
              <p className="text-secondary" style={{ whiteSpace: "pre-wrap", lineHeight: "1.6" }}>
                {description}
              </p>

              {required_skills && (
                <div className="mt-3">
                  <h6 className="fw-bold text-dark mb-2">Required Skills & Prerequisites</h6>
                  <div className="d-flex flex-wrap gap-2">
                    {required_skills.split(",").map((skill, index) => (
                      <span
                        key={index}
                        className="badge bg-secondary-subtle text-secondary border px-2 py-1"
                      >
                        {skill.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="modal-footer border-top-0 pt-0">
              <button
                type="button"
                className="btn btn-secondary px-4 rounded-2"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
