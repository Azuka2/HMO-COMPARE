# RESTORE STABLE RELEASE v1.0.0-stable

## Quick Reference

**Stable Tag:** `v1.0.0-stable`  
**Stable Commit:** `bd060b1bcb7db3de5d30688277988ff909037de0`  
**Repository:** https://github.com/Azuka2/HMO-COMPARE  

---

## When to Use This Guide

Use these instructions if:
- You need to revert to a known-working version
- Development broke something in a later commit
- You want to verify the stable version still works
- You're setting up a clean clone and want the stable state

---

## Option 1: Restore Using Tag (Recommended)

This is the safest method. It uses the tag as an immutable reference.

```bash
# Navigate to your repository
cd ~/HMO-COMPARE

# Fetch latest tags from remote
git fetch origin --tags

# Switch to the stable tag
git checkout v1.0.0-stable

# Verify you're at the right commit
git log -1 --oneline
# Output should show: bd060b1 fix: update version meta tag to current HEAD
```

**Result:** Your working directory is at the stable commit, but you're in "detached HEAD" state (not on any branch).

### To continue development from stable:

```bash
# Create a new branch from the stable state
git checkout -b new-feature-branch

# Or switch back to main (which also points to stable)
git checkout main
```

---

## Option 2: Reset Main Branch to Stable

Use this if you want to reset the main branch to the stable state.

**WARNING:** This discards any commits after bd060b1 on main. Only use if you're sure.

```bash
# Fetch latest from remote
git fetch origin

# Verify current main state
git log origin/main -3 --oneline

# Switch to main
git checkout main

# Reset to stable commit
git reset --hard v1.0.0-stable

# Verify reset worked
git log -1 --oneline
# Output: bd060b1 fix: update version meta tag to current HEAD

# Push the reset (ONLY if you're authorized to force-push)
# ⚠️  DO NOT FORCE PUSH unless absolutely necessary
git push origin main --force-with-lease
```

---

## Option 3: Checkout Just the Commit

Use this if you want to examine the stable state without tagging.

```bash
# Checkout the exact commit
git checkout bd060b1bcb7db3de5d30688277988ff909037de0

# Verify
git log -1 --oneline
```

**Result:** You're in detached HEAD state at the stable commit.

---

## Verify the Stable State Works Locally

After restoring, always verify the application works:

```bash
# Install dependencies (if needed)
npm install

# Run tests
npm test
# Expected: 62/62 tests passing

# Start the application
npm start
# Expected: 
#   ✅ Dataset loaded: 86 plans from 16 HMOs
#   🚀 HMO Blueprint Nigeria running on http://localhost:3000

# In another terminal, test the app
curl http://localhost:3000/api/version
# Should return JSON with version info

curl http://localhost:3000/api/dataset
# Should return dataset metadata
```

**Local verification:**
1. Open http://localhost:3000 in browser
2. Click "Start — takes 4 minutes"
3. Verify Question 1 appears
4. Click "Learn" (should work)
5. Click "About" (should work)
6. Complete assessment and verify results appear

---

## Restore Production Deployment

If you need to redeploy the stable version to Railway:

```bash
# Ensure you're on the stable commit
git checkout v1.0.0-stable

# Or ensure main is at stable
git checkout main
git reset --hard v1.0.0-stable

# Push to GitHub (this triggers Railway auto-deploy)
git push origin main

# If main is behind, fetch first
git fetch origin
git merge origin/main
git push origin main
```

**Railway deployment:**
- Watches the `main` branch automatically
- Deployment starts within 30 seconds of push
- Takes 3-5 minutes to build and deploy
- Live at https://hmo-compare-production.up.railway.app/

**Verify deployment:**
```bash
# Check if the new version is live
curl https://hmo-compare-production.up.railway.app/api/version

# Should return current deployment timestamp
```

---

## Troubleshooting

### Tag not found locally

```bash
# Fetch tags from remote
git fetch origin --tags

# Verify tag exists
git tag | grep v1.0.0-stable

# Then retry checkout
git checkout v1.0.0-stable
```

### Detached HEAD state after checkout

```bash
# If you're at stable but in detached HEAD:

# Create a branch to continue work
git checkout -b new-development

# OR go back to main
git checkout main
```

### Local changes prevent checkout

```bash
# If git says you have uncommitted changes:

# Stash them safely
git stash

# Then retry checkout
git checkout v1.0.0-stable

# Later, apply your changes on top
git stash pop
```

### Need to see commits between stable and current

```bash
# See all commits since stable
git log v1.0.0-stable..HEAD --oneline

# See commits on stable not on current branch
git log HEAD..v1.0.0-stable --oneline
```

---

## Important Safety Notes

### NEVER:

❌ Use `git reset --hard` without `--force-with-lease` on shared branches  
❌ Force-push to main without coordination  
❌ Delete the v1.0.0-stable tag  
❌ Rewrite history that includes the stable commit  

### ALWAYS:

✅ Fetch latest before resetting: `git fetch origin`  
✅ Verify you're at the right commit: `git log -1`  
✅ Test locally before deploying: `npm test && npm start`  
✅ Use `--force-with-lease` instead of `--force` to avoid overwriting other people's work  

---

## Git Reference (All Safe Options)

```bash
# Safe: Just look at stable state
git checkout v1.0.0-stable
git log -p HEAD~5..HEAD              # See recent changes

# Safe: Create a branch from stable to work
git checkout -b bugfix-v1 v1.0.0-stable

# Safe: Reset your local main to stable
git checkout main
git reset --hard v1.0.0-stable       # Only if you're sure

# Safe: Deploy to Railway
git push origin main                 # If main is already at stable

# Less safe: Reset and force-push (only if authorized)
git reset --hard v1.0.0-stable
git push origin main --force-with-lease
```

---

## Questions?

- **How do I see what changed since stable?**
  ```bash
  git diff v1.0.0-stable HEAD
  ```

- **How do I create a branch based on stable?**
  ```bash
  git checkout -b my-branch v1.0.0-stable
  ```

- **How do I see the stable commit details?**
  ```bash
  git show v1.0.0-stable
  ```

- **How do I revert a specific file to stable?**
  ```bash
  git checkout v1.0.0-stable -- path/to/file
  ```

- **How do I check if main is at stable?**
  ```bash
  git log -1 --oneline origin/main
  # Should show: bd060b1 fix: update version meta tag to current HEAD
  ```

---

**Last Updated:** 2026-08-28  
**Guide Version:** 1.0  
**For Stable Release:** v1.0.0-stable (bd060b1)
