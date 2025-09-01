# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

NeuroFit is an AI-powered fitness technology platform targeting the £69 billion corporate wellness market. It combines real-time AI form analysis, corporate wellness integration, and NHS-compliant medical monitoring for ADHD-optimized fitness solutions.

**Key Innovation:** First-to-market AI exercise form analysis  
**Target Revenue:** £750,000/month by month 18  
**Market Position:** Industry leader in AI-powered corporate wellness

## Repository Structure

```
neurofit/
├── business-strategy/          # Business plans, action plans, conversion strategies
├── technical-specs/           # System architecture and technical specifications  
├── market-research/           # Competitive analysis and market studies
├── implementation-plans/      # Development roadmaps and feature specifications
├── program-content/           # Training modules and course content (HTML format)
├── academic-research/         # Research prompts and academic specifications
├── scripts/                   # Python utilities for data processing and analysis
├── data/                      # CSV datasets and competitive analytics
└── docs/                      # PDF documentation and reports
```

## Core Architecture & Technology Stack

### Three Flagship Features

1. **AI Form Analysis System**
   - Real-time exercise technique correction using computer vision
   - TensorFlow/PyTorch + OpenCV + MediaPipe pipeline
   - Mobile-first React Native with TensorFlow Lite
   - £200/month premium tier pricing

2. **Corporate Integration Platform** 
   - Microsoft Teams/Slack bot integration
   - HRIS synchronization (Workday, BambooHR)
   - Executive analytics dashboard
   - £20,000-100,000 enterprise contracts

3. **Medical Monitoring & NHS Integration**
   - NHS Digital API compliance
   - Clinical exercise prescription engine
   - Medical outcome tracking
   - £500,000+ NHS contract potential

### Technology Stack

- **AI/ML:** TensorFlow, PyTorch, MediaPipe, OpenCV
- **Mobile:** React Native with TensorFlow Lite  
- **Backend:** Python FastAPI, Node.js microservices
- **Cloud:** AWS/Azure with Kubernetes orchestration
- **Integration:** OAuth2.0, REST APIs, WebSockets
- **Compliance:** GDPR, HIPAA, NHS Digital standards

### Microservices Architecture

```yaml
services:
  - auth-service: Enterprise SSO (Node.js, OAuth2.0, JWT)
  - integration-service: HRIS and calendar sync (Python, FastAPI, Celery)  
  - analytics-service: Corporate wellness analytics (Python, Pandas, PostgreSQL)
  - notification-service: Teams/Slack bot management (Node.js, Bot Framework)
  - ai-form-service: Real-time exercise analysis (Python, TensorFlow)
  - medical-service: NHS integration and monitoring (Python, FHIR)
```

## Development Commands

### Python Scripts and Data Analysis
```bash
# Run competitive analysis
python scripts/script.py

# Generate pricing recommendations  
python scripts/chart_script.py

# Process market research data
python scripts/script_1.py
```

### Environment Setup
```bash
# Create Python virtual environment
python -m venv venv
venv\Scripts\activate  # Windows
source venv/bin/activate  # Linux/Mac

# Install dependencies (when requirements.txt is created)
pip install -r requirements.txt

# Install AI/ML stack
pip install tensorflow pytorch opencv-python mediapipe scikit-learn pandas numpy
```

### AI Model Development
```bash
# Train form analysis model
python -m neurofit.ai.train_form_model --exercises=10 --epochs=100

# Test model accuracy  
python -m neurofit.ai.evaluate_model --model_path=models/form_analysis_v2.pb

# Convert to TensorFlow Lite for mobile
python -m neurofit.ai.convert_to_tflite --input_model=form_analysis_v2.pb
```

### Mobile Development
```bash
# React Native setup
npx react-native init NeuroFitMobile
cd NeuroFitMobile

# Install TensorFlow Lite
npm install react-native-tensorflow-lite

# Run on iOS simulator
npx react-native run-ios

# Run on Android emulator  
npx react-native run-android
```

### Corporate Integration Testing
```bash
# Test Teams bot locally
node corporate/teams-bot/server.js

# Test HRIS integrations
python -m neurofit.corporate.test_workday_sync

# Validate OAuth2 flows
python -m neurofit.auth.test_enterprise_sso
```

## Development Phases & Roadmap

### Phase 1: AI Form Analysis MVP (Months 1-3)
- **Investment:** £75,000
- **Team:** 2 AI engineers + 1 mobile developer  
- **Deliverable:** 10 exercises with real-time analysis
- **Technical Milestones:**
  - Week 4: Basic pose detection working
  - Week 8: Form scoring algorithm complete
  - Week 12: Mobile app with AI integration

### Phase 2: Corporate Integration (Months 4-6)
- **Investment:** £60,000  
- **Team:** 2 backend developers + 1 enterprise specialist
- **Deliverable:** Teams integration + HRIS connections
- **Business Milestones:**
  - Month 4: First corporate pilot signed
  - Month 5: Teams bot in production
  - Month 6: 3 enterprise contracts secured

### Phase 3: Medical Platform (Months 7-18)  
- **Investment:** £490,000
- **Team:** Full medical development team
- **Deliverable:** NHS-compliant health monitoring system
- **Regulatory Milestones:**
  - Month 9: NHS compliance framework complete
  - Month 12: First NHS pilot program  
  - Month 15: Full medical platform launch

## Compliance & Security Requirements

### NHS Digital Integration Standards
```python
# Required compliance patterns
class NHSDigitalConnector:
    def __init__(self, api_key, organisation_code):
        self.base_url = "https://digital.nhs.uk/developer/api-catalogue"
        self.encryption_key = Fernet.generate_key()
        
    def encrypt_pii(self, nhs_number):
        """All PII must be encrypted at rest and in transit"""
        return self.cipher_suite.encrypt(data.encode()).decode()
```

### Security Framework
- **Data Classification:** Patient identifiable data encrypted at rest/transit
- **Access Controls:** Role-based access + MFA required  
- **Audit Requirements:** Log all patient data access, 7-year retention
- **Backup Strategy:** Encrypted backups with geographic redundancy

### Enterprise Integration Patterns
```javascript
// Microsoft Teams Bot Framework
class NeuroFitTeamsBot extends ActivityHandler {
    async on_message_activity(turn_context) {
        // Handle workout suggestions, progress tracking, team challenges
        const user_message = turn_context.activity.text.lower();
        if ('workout' in user_message) {
            await this.suggest_workout(turn_context);
        }
    }
}
```

## Revenue Model & Market Targets

### Pricing Strategy
- **AI Premium Users:** £200/month per user
- **Corporate Contracts:** £20,000-100,000 per enterprise  
- **NHS Partnerships:** £500,000+ annually per trust

### Success Metrics Timeline
| Timeframe | Monthly Revenue | Key Milestones |
|-----------|----------------|----------------|
| Month 6   | £100,000       | AI MVP + Corporate Pilots |
| Month 12  | £250,000       | Full Corporate Integration |  
| Month 18  | £750,000       | Complete Medical Platform |

## Common Development Tasks

### Working with Business Strategy Documents
All strategic documents are in Markdown format in `business-strategy/`. Key files:
- `NeuroFit_Executive_Action_Plan.md` - 18-month roadmap and investment requirements
- `NeuroFit_Zero_Budget_Reality_Plan.md` - Bootstrap development approach

### Implementation Planning  
HTML-formatted implementation plans in `implementation-plans/` contain:
- Complete feature specifications
- UI/UX mockups and wireframes
- Technical architecture diagrams
- Development timelines

### Market Research Data
CSV datasets in `data/` directory:
- `neurofit_competitive_analysis.csv` - Competitor pricing and features
- `neurofit_pricing_recommendations.csv` - Market positioning data

### Program Content Development
Training modules and course content stored as HTML in `program-content/`:
- NeuroFit core program curriculum
- Corporate workshop content  
- Coach certification programs
- Medical integration protocols

## Competitive Advantages

1. **Pete Ryan's Champion Credibility** - Powerlifting champion validation
2. **ADHD-Focused Approach** - Underserved market with specific needs  
3. **UK NHS Integration** - Government partnership potential
4. **First-Mover AI Advantage** - No competitors with real-time form analysis

## Key File Locations

- **Technical Specifications:** `technical-specs/NeuroFit_Technical_Specifications.md`
- **Business Plan:** `business-strategy/NeuroFit_Executive_Action_Plan.md`  
- **Market Research:** `market-research/` (multiple comprehensive reports)
- **Implementation Plans:** `implementation-plans/` (HTML format with mockups)
- **Data Analysis Scripts:** `scripts/` (Python utilities)
- **Competitive Data:** `data/` (CSV format)

## Notes for WARP

- This is primarily a strategy and planning repository, not an active codebase
- Python scripts in `scripts/` generate competitive analysis and market data
- HTML files contain rich implementation specifications with embedded CSS/JS
- All financial projections and business metrics are research-backed
- Focus on the three flagship features when discussing technical implementation
- Pete Ryan (the founder) is a powerlifting champion, which provides credibility for form analysis
- UK market focus with specific NHS integration requirements
- 18-month timeline to £750k monthly revenue with specific phase gates

