export default function OpportunityCard({ opportunity, onViewDetails }) {
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
    <div className="card h-100 shadow-sm border-0 rounded-3">
      <div className="card-body d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start mb-2">
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

        <h5 className="card-title fw-bold text-dark mb-2">{title}</h5>

        <h6 className="card-subtitle mb-3 text-muted small">
          {faculty_name} &bull; {department}
        </h6>

        <p className="card-text text-secondary mb-3 flex-grow-1" style={{ fontSize: "0.925rem" }}>
          {description.length > 130
            ? `${description.substring(0, 130)}...`
            : description}
        </p>

        {required_skills && (
          <div className="mb-3">
            <span className="text-muted small d-block mb-1">Required Skills:</span>
            <div className="d-flex flex-wrap gap-1">
              {required_skills.split(",").map((skill, index) => (
                <span
                  key={index}
                  className="badge bg-light text-dark border small"
                >
                  {skill.trim()}
                </span>
              ))}
            </div>
          </div>
        )}

        <hr className="my-2 opacity-25" />

        <div className="d-flex justify-content-between align-items-center small text-muted mb-3">
          <span>
            <strong>Positions:</strong> {available_positions}
          </span>
          <span>
            <strong>Deadline:</strong> {application_deadline}
          </span>
        </div>

        <button
          className="btn btn-outline-primary btn-sm w-100 rounded-2 fw-medium"
          onClick={() => onViewDetails(opportunity)}
        >
          View Details
        </button>
      </div>
    </div>
  );
}
