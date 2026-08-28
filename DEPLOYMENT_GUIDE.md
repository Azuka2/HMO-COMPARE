# HMO BLUEPRINT NIGERIA — DEPLOYMENT GUIDE

**Status:** ✅ Ready for Production Deployment  
**Application Type:** Node.js Server  
**Runtime Required:** Node 20+  
**No Build Process:** Static HTML + ES modules  

---

## QUICK START — LOCAL VERIFICATION

The application is currently running locally:

```bash
npm start
# Server: http://localhost:3000
```

**Verify Locally:**
1. Open http://localhost:3000 in browser
2. Complete assessment (all 22 questions)
3. View recommendations and personalization
4. Test comparison and coverage gap calculator

---

## DEPLOYMENT — RECOMMENDED PLATFORMS

### Option A: Railway (RECOMMENDED — Easiest)

**Why Railway:**
- Native Node.js support
- No configuration needed
- Auto-deploys from GitHub
- ₦ Free tier available
- Custom domain support

**Steps:**
1. Go to https://railway.app
2. Sign in with GitHub (Azuka2 account)
3. Click "Deploy from GitHub"
4. Select `Azuka2/HMO-COMPARE`
5. Select branch: `claude/hmo-blueprint-acceptance-audit-m4jfqe`
6. Railway auto-detects Node.js
7. Click "Deploy"
8. Railway provides: `https://yourrailway.app` (auto-generated)

**Environment Variables:** None required (all data embedded)

**Deployment Time:** 3-5 minutes

---

### Option B: Render (Alternative)

**Steps:**
1. https://render.com
2. New → Web Service
3. Connect GitHub → Azuka2/HMO-COMPARE
4. Branch: `claude/hmo-blueprint-acceptance-audit-m4jfqe`
5. Runtime: Node
6. Build Command: Leave empty (no build needed)
7. Start Command: `npm start`
8. Deploy
9. Render provides live URL

---

### Option C: Heroku (Legacy but Works)

**Steps:**
1. `heroku create hmo-blueprint-nigeria`
2. `git push heroku claude/hmo-blueprint-acceptance-audit-m4jfqe:main`
3. Heroku auto-runs `npm start`
4. URL: `https://hmo-blueprint-nigeria.herokuapp.com`

---

### Option D: DigitalOcean App Platform

**Steps:**
1. DigitalOcean → Apps → Create App
2. GitHub: Azuka2/HMO-COMPARE
3. Branch: `claude/hmo-blueprint-acceptance-audit-m4jfqe`
4. HTTP Port: 3000
5. Deploy
6. URL provided automatically

---

## DEPLOYMENT CHECKLIST

Before deploying, verify:

- [x] Code committed: `git status` shows clean tree
- [x] Branch is correct: `claude/hmo-blueprint-acceptance-audit-m4jfqe`
- [x] P0 fix present: Commit `8fc47c1` in history
- [x] Tests passing: `npm test` returns 62/62
- [x] Server starts: `npm start` runs without errors
- [x] API responds: `/api/match` returns results
- [x] Frontend loads: HTML file in `public/`
- [x] Data loads: CSV file present and parsed
- [x] No secrets: No API keys in code
- [x] No hardcoded URLs: Works on any domain
- [x] Environment-ready: PORT env var supported

---

## POST-DEPLOYMENT VERIFICATION

Once deployed and live URL obtained:

**1. Test Landing Page**
```
GET https://your-deployed-url.app/
Expected: HTML loads, title visible, no errors
```

**2. Test API**
```bash
curl -X POST https://your-deployed-url.app/api/match \
  -H "Content-Type: application/json" \
  -d '{"assessment": {...}}'
Expected: 200 OK, top_3 array returned
```

**3. Test Full Journey**
- Open URL in browser
- Complete assessment
- View recommendations
- Test comparison
- Test coverage gap
- Verify prices display correctly

**4. Test Mobile**
- Open in mobile browser (360px)
- Verify buttons clickable
- Verify no horizontal scroll
- Verify results render

---

## ENVIRONMENT CONFIGURATION

**No environment variables required.**

All configuration is in code:
- Data file: `data/MASTER_PLAN_PRICING.csv`
- Default port: 3000 (uses PORT env var if set)
- All HMO data embedded

---

## TROUBLESHOOTING

**Issue: "Port 3000 already in use"**
- Solution: Use environment variable
- Command: `PORT=8080 npm start`

**Issue: "Cannot find module"**
- Solution: Ensure `node_modules` installed (not needed, no dependencies)
- Verify all source files present

**Issue: "No plans loading"**
- Solution: Verify `data/MASTER_PLAN_PRICING.csv` exists
- Check file permissions

**Issue: "API returns empty results"**
- Solution: P0 fix applied in commit `8fc47c1`
- Verify deployment includes this commit

---

## MONITORING & LOGS

**Railway/Render/Heroku provide:**
- Live logs accessible in dashboard
- Auto-restart on crash
- Uptime monitoring
- Custom domain setup

**Health Check URL:**
```
GET https://your-url.app/api/dataset
Expected: JSON with plan count and HMO list
```

---

## PERFORMANCE

Expected performance:
- Page load: <2 seconds
- Assessment page: <100ms per question
- Matching: <500ms (first run loads data)
- Result rendering: <1 second

No optimization needed for initial deployment.

---

## DATA UPDATES

To update HMO data after deployment:

1. Update `src/data/MASTER_PLAN_PRICING.csv`
2. Commit: `git commit -am "update: refresh HMO pricing data"`
3. Push: `git push origin claude/hmo-blueprint-acceptance-audit-m4jfqe`
4. Platform auto-redeploys (Railway/Render/Heroku)
5. New data live within 2-5 minutes

---

## ROLLBACK

If deployment has issues:

1. Check Rails/Render/Heroku logs
2. Identify the issue
3. Create a fix commit
4. Push to GitHub
5. Platform auto-redeploys
6. Or manually revert to previous deployment

---

## NEXT STEPS

1. **Choose deployment platform** (Railway recommended)
2. **Deploy using instructions above**
3. **Test live URL** using verification steps
4. **Run real-user testing** with provided URL
5. **Collect feedback** using tester script
6. **Document results** in acceptance report

---

## DEPLOYMENT READINESS SUMMARY

✅ Application complete  
✅ Tests passing  
✅ P0 fix applied  
✅ No external dependencies  
✅ No credentials/secrets in code  
✅ Environment-agnostic  
✅ Ready for production deployment

**Estimated time to live:** 5-15 minutes (deployment platform + DNS propagation)

