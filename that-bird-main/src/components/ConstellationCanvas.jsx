import React, { useRef, useState, useEffect } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import cyberData from '../data/cyberDomains.json';
import ModalCard from './ModalCard';
import { neonThemes } from '../assets/neonThemes';

const ConstellationCanvas = () => {
  const fgRef = useRef();
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });
  const [expandedCategories, setExpandedCategories] = useState({});
  const [selectedNode, setSelectedNode] = useState(null);
  const [theme, setTheme] = useState('electric-blue');

  useEffect(() => {
    const nodes = [];
    const links = [];

    cyberData.categories.forEach(cat => {
      nodes.push({ id: cat.id, label: cat.label, type: 'category', color: cat.color });
      if (expandedCategories[cat.id]) {
        cat.children.forEach(child => {
          nodes.push({ ...child, type: 'child', parent: cat.id });
          links.push({ source: cat.id, target: child.id });
        });
      }
    });

    setGraphData({ nodes, links });
  }, [expandedCategories]);

  const handleNodeClick = node => {
    if (node.type === 'category') {
      setExpandedCategories(prev => ({
        ...prev,
        [node.id]: !prev[node.id]
      }));
    } else if (node.type === 'child') {
      setSelectedNode(node);
    }
  };

  return (
    <>
      <ForceGraph2D
        ref={fgRef}
        graphData={graphData}
        nodeLabel="label"
        nodeAutoColorBy="type"
        linkDirectionalParticles={2}
        linkDirectionalParticleSpeed={0.005}
        enableNodeDrag
        enableZoomPanInteraction
        onNodeClick={handleNodeClick}
        nodeCanvasObject={(node, ctx) => {
          const glow = neonThemes[theme];
          ctx.shadowColor = glow[node.type];
          ctx.shadowBlur = 20;
          ctx.fillStyle = glow[node.type];
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.type === 'category' ? 14 : 9, 0, 2 * Math.PI);
          ctx.fill();
          ctx.shadowBlur = 0;
          ctx.fillStyle = '#fff';
          ctx.font = '12px sans-serif';
          ctx.fillText(node.label, node.x + 10, node.y + 4);
        }}
      />
      {selectedNode && (
        <ModalCard node={selectedNode} onClose={() => setSelectedNode(null)} />
      )}
    </>
  );
};

export default ConstellationCanvas;
