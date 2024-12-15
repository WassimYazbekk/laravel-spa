document.addEventListener("DOMContentLoaded", () => {
    const appContent = document.getElementById("app-content");

    if (!appContent) {
        console.error(
            "Element with ID #app-content not found. Exiting script.",
        );
        return;
    }

    // Function to update the page title and meta tags
    const updateMetaTags = (html) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");

        // Update the title
        document.title =
            doc.querySelector("title")?.innerText || "Default Title";

        // Remove existing meta tags
        document.head.querySelectorAll("meta").forEach((meta) => meta.remove());

        // Add new meta tags
        doc.head.querySelectorAll("meta").forEach((meta) => {
            document.head.appendChild(meta.cloneNode(true));
        });
    };

    // Function to show a loading state
    const showLoading = () => {
        appContent.classList.add("loading");
    };

    // Function to hide the loading state
    const hideLoading = () => {
        appContent.classList.remove("loading");
    };

    // Function to fetch and render the new content
    const loadContent = async (url) => {
        try {
            showLoading();

            const response = await axios.get(url, {
                headers: {
                    "X-Requested-With": "XMLHttpRequest",
                },
            });

            // Parse the response and extract #app-content's inner HTML
            const parser = new DOMParser();
            const doc = parser.parseFromString(response.data, "text/html");
            const newAppContent = doc.querySelector("#app-content");

            if (newAppContent) {
                // Replace the inner HTML of the current #app-content
                appContent.innerHTML = newAppContent.innerHTML;
            } else {
                console.error(
                    "Response does not contain an element with ID #app-content.",
                );
            }

            // Update URL in the browser
            window.history.pushState({}, "", url);

            // Update title and meta tags
            updateMetaTags(response.data);
        } catch (error) {
            console.error("Failed to load content:", error);
            appContent.innerHTML =
                "<p>Failed to load content. Please try again later.</p>";
        } finally {
            hideLoading();
        }
    };

    // Function to initialize navigation interception
    const initNavigation = () => {
        document.querySelectorAll("a.nav-link").forEach((link) => {
            link.addEventListener("click", (e) => {
                e.preventDefault(); // Prevent default navigation

                const url = link.getAttribute("href");
                loadContent(url); // Fetch and render the new content
            });
        });
    };

    // Intercept navigation links on initial load
    initNavigation();

    // Handle browser back/forward navigation
    window.addEventListener("popstate", () => {
        loadContent(window.location.pathname);
    });

    // Reinitialize navigation links after content update
    const observer = new MutationObserver(() => {
        initNavigation();
    });

    // Ensure #app-content exists before observing
    if (appContent) {
        observer.observe(appContent, { childList: true, subtree: true });
    } else {
        console.error(
            "Element with ID #app-content not found. MutationObserver not initialized.",
        );
    }
});
