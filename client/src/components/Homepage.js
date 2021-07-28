import React from "react";
import { Link } from "react-router-dom";
import MessageTimeline from "./MessageTimeline";

const Homepage = ({ currentUser }) => {
    if (!currentUser.inAuthenticated) {
        return (
            <div className="home-hero">
                <h1>What to share your thoughts?</h1>
                <h4>Welcome to warbler</h4>
                <Link to="/signup" className="btn btn-primary btn-space">
                    Sign Up here
                </Link>

                <footer class="footer">
                    <a
                        href="https://www.linkedin.com/in/divyanshutyagi/"
                        target="_blank"
                    >
                        Made with <span class="icon-heart">💖</span> by
                        Divyanshu Tyagi
                    </a>
                    &nbsp;:{" "}
                    <a
                        href="https://github.com/creatorgaming/warbler"
                        target="_blank"
                    >
                        <i class="fab fa-github"></i>
                    </a>
                </footer>
            </div>
        );
    }
    return (
        <div>
            <MessageTimeline
                profileImageUrl={currentUser.user.profileImageUrl}
                username={currentUser.user.username}
            />
        </div>
    );
};

export default Homepage;
