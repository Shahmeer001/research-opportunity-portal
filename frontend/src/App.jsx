import { useState, useEffect, useMemo } from "react";
import { fetchOpportunities } from "./api";
import { createOpportunity, updateOpportunity } from "./opportunityApi";
import OpportunityCard from "./components/OpportunityCard";
import DetailsModal from "./components/DetailsModal";
import OpportunityForm from "./components/OpportunityForm";

export default function App() {
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);

  // Create / edit form: null | "new" | an opportunity object
  const [editing, setEditing] = useState(null);
  // Success message shown after create / update
  const [notice, setNotice] = useState(null);

  // Filters & Search
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [areaFilter, setAreaFilter] = useState("All");

  const loadOpportunities = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchOpportunities();
      setOpportunities(data);
    } catch (err) {
      setError(err.message || "Failed to load opportunities.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let ignore = false;
    fetchOpportunities()
      .then((data) => {
        if (!ignore) {
          setOpportunities(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!ignore) {
          setError(err.message || "Failed to load opportunities.");
          setLoading(false);
        }
      });
    return () => {
      ignore = true;
    };
  }, []);

  // Called by the form. If this throws, the form shows the error itself.
  const handleSave = async (payload) => {
    if (editing === "new") {
      await createOpportunity(payload);
      setNotice("Opportunity created successfully.");
    } else {
      await updateOpportunity(editing.id, payload);
      setNotice("Opportunity updated successfully.");
    }
    setEditing(null);
    loadOpportunities();
  };

  // Unique research areas for filter dropdown
  const uniqueAreas = useMemo(() => {
    const areas = opportunities.map((opp) => opp.research_area).filter(Boolean);
    return Array.from(new Set(areas));
  }, [opportunities]);

  // Filtered opportunities
  const filteredOpportunities = useMemo(() => {
    return opportunities.filter((opp) => {
      const matchesSearch =
        opp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        opp.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        opp.faculty_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        opp.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (opp.required_skills &&
          opp.required_skills.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesStatus =
        statusFilter === "All" || opp.status === statusFilter;

      const matchesArea =
        areaFilter === "All" || opp.research_area === areaFilter;

      return matchesSearch && matchesStatus && matchesArea;
    });
  }, [opportunities, searchTerm, statusFilter, areaFilter]);

  return (
    <div className="min-vh-100 bg-light">
      {/* Header / Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
        <div className="container">
          <span className="navbar-brand fw-bold fs-4">
            🎓 Research Opportunity Portal
          </span>
          <button
            className="btn btn-primary"
            onClick={() => setEditing("new")}
          >
            + New Opportunity
          </button>
        </div>
      </nav>

      {/* Main Container */}
      <div className="container py-4">
        {/* Success message */}
        {notice && (
          <div
            className="alert alert-success alert-dismissible shadow-sm"
            role="alert"
          >
            {notice}
            <button
              type="button"
              className="btn-close"
              onClick={() => setNotice(null)}
            />
          </div>
        )}

        {/* Controls / Filter Bar */}
        <div className="card shadow-sm border-0 mb-4 rounded-3">
          <div className="card-body p-3">
            <div className="row g-2 align-items-center">
              <div className="col-md-5">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by title, faculty, skills, or area..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="col-md-3">
                <select
                  className="form-select"
                  value={areaFilter}
                  onChange={(e) => setAreaFilter(e.target.value)}
                >
                  <option value="All">All Research Areas</option>
                  {uniqueAreas.map((area) => (
                    <option key={area} value={area}>
                      {area}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-2">
                <select
                  className="form-select"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="All">All Statuses</option>
                  <option value="Open">Open</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
              <div className="col-md-2 d-flex">
                <button
                  className="btn btn-outline-secondary w-100"
                  onClick={() => {
                    setSearchTerm("");
                    setAreaFilter("All");
                    setStatusFilter("All");
                  }}
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* State Displays */}
        {loading && (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2 text-muted">Loading research opportunities...</p>
          </div>
        )}

        {error && (
          <div className="alert alert-danger d-flex justify-content-between align-items-center shadow-sm" role="alert">
            <div>
              <strong>Error:</strong> {error}
            </div>
            <button className="btn btn-outline-danger btn-sm" onClick={loadOpportunities}>
              Retry
            </button>
          </div>
        )}

        {/* Opportunities List */}
        {!loading && !error && (
          <>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="text-secondary fw-semibold m-0">
                Opportunities ({filteredOpportunities.length})
              </h5>
              <button
                className="btn btn-sm btn-link text-decoration-none"
                onClick={loadOpportunities}
              >
                🔄 Refresh
              </button>
            </div>

            {filteredOpportunities.length === 0 ? (
              <div className="text-center py-5 bg-white rounded-3 shadow-sm">
                <h5 className="text-muted">No research opportunities found</h5>
                <p className="text-secondary small">
                  {opportunities.length === 0
                    ? "There are currently no research opportunities posted."
                    : "Try adjusting your search or filter criteria."}
                </p>
              </div>
            ) : (
              <div className="row g-4">
                {filteredOpportunities.map((opp) => (
                  <div key={opp.id} className="col-md-6 col-lg-4">
                    <OpportunityCard
                      opportunity={opp}
                      onViewDetails={(item) => setSelectedOpportunity(item)}
                    />
                    <button
                      className="btn btn-sm btn-outline-secondary w-100 mt-2"
                      onClick={() => setEditing(opp)}
                    >
                      Edit
                    </button>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Details Modal */}
      {selectedOpportunity && (
        <DetailsModal
          opportunity={selectedOpportunity}
          onClose={() => setSelectedOpportunity(null)}
        />
      )}

      {/* Create / Edit Form */}
      {editing && (
        <OpportunityForm
          initial={editing === "new" ? null : editing}
          onSubmit={handleSave}
          onClose={() => setEditing(null)}
        />
      )}
    </div>
  );
}