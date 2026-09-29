import { useState, useRef, useEffect } from "react";

export default function OpportunityCard({
  opportunity,
  onViewDetails,
  onEdit,
  onToggleStatus,
  onDelete,
}) {
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
  const prevStatusRef = useRef(status);
  const [pulsing, setPulsing] = useState(false);

  // Pulse animation on status change
  useEffect(() => {
    if (prevStatusRef.current !== status) {
      setPulsing(true);
      const timer = setTimeout(() => setPulsing(false), 750);
      prevStatusRef.current = status;
      return () => clearTimeout(timer);
    }
  }, [status]);

  return (
    <div className="w-100">
      <div
        className={`tilt-card d-flex flex-column ${
          isOpen ? "status-open" : "status-closed"
        } ${pulsing ? "status-pulse" : ""}`}
      >
        <div className="card-body d-flex flex-column p-4">
          {/* Top Badges */}
          <div className="d-flex justify-content-between align-items-start mb-2 gap-2">
            <span
              className="badge border px-2 py-1 text-truncate"
              style={{
                backgroundColor: "rgba(193, 98, 45, 0.12)",
                color: "var(--color-accent)",
                borderColor: "rgba(193, 98, 45, 0.25)",
              }}
            >
              {research_area}
            </span>
            <span
              className="badge px-2 py-1"
              style={{
                backgroundColor: isOpen ? "var(--color-open)" : "var(--color-closed)",
                color: "#ffffff",
              }}
            >
              {status}
            </span>
          </div>

          {/* Title and Faculty */}
          <h5 className="card-title fw-bold text-dark mb-1 mt-1">{title}</h5>
          <h6 className="card-subtitle mb-3 text-muted small">
            {faculty_name} &bull; {department}
          </h6>

          {/* Description snippet */}
          <p
            className="card-text text-secondary mb-3 flex-grow-1"
            style={{ fontSize: "0.925rem", lineHeight: "1.5" }}
          >
            {description.length > 130
              ? `${description.substring(0, 130)}...`
              : description}
          </p>

          {/* Staggered Skills */}
          {required_skills && (
            <div className="mb-3">
              <span className="text-muted small d-block mb-1">Required Skills:</span>
              <div className="d-flex flex-wrap gap-1">
                {required_skills.split(",").map((skill, index) => (
                  <span
                    key={index}
                    className="badge bg-light text-dark border small stagger-chip"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {skill.trim()}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Metadata */}
          <hr className="my-2 opacity-25" />
          <div className="d-flex justify-content-between align-items-center small text-muted mb-3">
            <span>
              <strong>Positions:</strong> {available_positions}
            </span>
            <span>
              <strong>Deadline:</strong> {application_deadline}
            </span>
          </div>

          {/* Primary View Details Button */}
          <button
            className="btn btn-primary btn-sm w-100 rounded-2 fw-medium mb-3"
            onClick={() => onViewDetails(opportunity)}
          >
            View Details
          </button>

          {/* Integrated Actions Area: Status Toggle + Edit + Delete */}
          {(onToggleStatus || onEdit || onDelete) && (
            <div className="d-flex align-items-center justify-content-between pt-2 border-top border-secondary border-opacity-10 gap-2">
              {/* iOS-Style Status Toggle */}
              {onToggleStatus && (
                <div
                  className="ios-switch-container"
                  title={`Click to mark as ${isOpen ? "Closed" : "Open"}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleStatus(opportunity);
                  }}
                >
                  <div className={`ios-switch-track ${isOpen ? "active" : ""}`}>
                    <div className="ios-switch-thumb" />
                  </div>
                  <span className="ios-switch-label">{status}</span>
                </div>
              )}

              {/* Edit and Delete Buttons */}
              <div className="d-flex gap-2 ms-auto">
                {onEdit && (
                  <button
                    className="btn btn-sm btn-primary px-3"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(opportunity);
                    }}
                  >
                    Edit
                  </button>
                )}
                {onDelete && (
                  <button
                    className="btn btn-sm btn-outline-danger px-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(opportunity);
                    }}
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
